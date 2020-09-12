from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep


class SudokuPwner:

    def __init__(self, grid):
        self.grid = grid
        self.newGrid = grid[:]
        self.savedStates = []
        self.remaining = 0
        self.initConstraints()
        self.solveSudoku()
        self.valid = True

    def initConstraints(self):
        possibleValues = {}
        for y in range(len(self.grid)):
            for x in range(len(self.grid[0])):
                if self.grid[y][x] == 0:
                    possibleValues[(x,y)] = set()
                    for i in range(1, 10):
                        if self.isPossibleValue(x, y, i):
                            possibleValues[(x,y)].add(i)
                    self.remaining += 1
        self.savedStates.append(possibleValues)

    def getNewPossibleValues(self, possibleValues):
        newPossibleValues = {}
        for key in possibleValues.keys():
            newPossibleValues[key] = set()
            x, y = key
            for elem in list(possibleValues[key]):
                if self.isPossibleValue(x, y, elem):
                    newPossibleValues[key].add(elem)
        return newPossibleValues

    def isPossibleValue(self, x, y, value):
        for i in range(9):
            if i != x:
                if self.newGrid[y][i] == value:
                    return False
        for i in range(9):
            if i != y:
                if self.newGrid[i][x] == value:
                    return False
        sx = (x // 3) * 3
        sy = (y // 3) * 3
        for i in range(3):
            for j in range(3):
                if sx + i != x or sy + j != y:
                    if self.newGrid[sy + j][sx + i] == value:
                        return False
        return True

    def fillBestSquare(self):
        latestState = self.savedStates[-1]
        possibleValues = self.getNewPossibleValues(latestState)
        remaining = len(possibleValues.keys())
        backupLowest = 10
        backupKey = None
        reset = False
        for key in possibleValues.keys():    
            if self.newGrid[key[1]][key[0]] == 0 and len(possibleValues[key]) == 1:
                x, y = key
                self.newGrid[y][x] = list(possibleValues[key])[0]
                possibleValues.pop(key, None)
                self.remaining -= 1
                break
            elif len(possibleValues[key]) == 0:
                if len(self.savedStates) == 1:
                    return False
                else:
                    self.savedStates.pop()
                    latestState = self.savedStates[-1]
                    self.resetToState(latestState)
                    reset = True
                    break
            elif backupLowest > len(list(possibleValues[key])):
                backupLowest = len(list(possibleValues[key]))
                backupKey = key

        if not reset:
            if remaining == len(possibleValues.keys()):
                value = list(possibleValues[backupKey])[0]
                self.newGrid[backupKey[1]][backupKey[0]] = value
                self.remaining -= 1
                possibleValues[backupKey].remove(value)
                self.savedStates[-1] = possibleValues
                valueCopy = dict(possibleValues)
                valueCopy.pop(backupKey, None)
                self.savedStates.append(valueCopy)
            else:
                self.savedStates[-1] = possibleValues
        return True

    def resetToState(self, state):
        for key in state.keys():
            x, y = key
            if self.newGrid[y][x] != 0:
                self.newGrid[y][x] = 0
                self.remaining += 1


    def fullCheck(self):
        for y in range(9):
            for x in range(9):
                value = self.newGrid[y][x]
                if value == 0:
                    return False
                if not self.isPossibleValue(x,y,value):
                    return False
        return True


    def getSolution(self):
        if not self.valid:
            return None
        return self.newGrid
        

    def solveSudoku(self):
        while self.remaining > 0:
            validPuzzle = self.fillBestSquare()
            if not validPuzzle:
                self.valid = False
                break
    



####### TIME TO SOLVE ###### 
######                ######  
############################


driver = webdriver.Chrome()
driver.get("http://view.websudoku.com/")
rows = []
for row in range(9):
    columns = []
    for col in range(9):
        idName = "c" + str(col) + str(row)
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, idName))
        )
        innerelem = element.find_element_by_css_selector("*")
        inner = innerelem.get_attribute('value')
        if inner:
            columns.append(int(inner))
        else:
            columns.append(0)
    rows.append(columns)

solver = SudokuPwner(rows)
solution = solver.getSolution()

for row in range(9):
    for col in range(9):
        idName = "c" + str(col) + str(row)
        element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, idName))
        )
        innerelem = element.find_element_by_css_selector("*")
        inner = innerelem.get_attribute('value')
        if not inner:
            innerelem.send_keys(str(solution[row][col]))


driver.save_screenshot("WINNERSWIN.png")
driver.find_element_by_xpath("/html/body/table/tbody/tr/td[3]/table/tbody/tr[2]/td/form/p[4]/input[1]").click()
assert ('Congratulations! You solved this Sudoku!' in driver.page_source) 
driver.quit()