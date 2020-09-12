from time import sleep
from random import random

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.action_chains import ActionChains

def start_driver():
    driver = webdriver.Chrome()
    driver.get("http://www.decisionproblem.com/paperclips/index2.html")
    return driver


def start(driver):
    def parse(s):
        try:
            components = s.replace(',', '').split(' ')
            if not components:
                return None
            n = float(components[0])
            w = 1
            if len(components) > 1:
                w = number_words[components[1]]
            return n * w
        except Exception:
            return None

    def elem(id):
        element = driver.find_element_by_id(id)
        if not element.is_displayed():
            return None
        try:
            return parse(element.text)
        except Exception:
            return None
    def click(id):
        button = driver.find_element_by_id(id)
        if button.is_displayed() and button.is_enabled():
            button.click()
            return True
        return False

    inventory_history = []
    def raise_or_lower(current_inventory):
        nonlocal inventory_history
        if current_inventory is None:
            return
        SAMPLES = 4
        inventory_history.append(current_inventory)
        inventory_history = inventory_history[-SAMPLES:]
        if len(inventory_history) < SAMPLES:
            return None
        inventory_delta = current_inventory - inventory_history[0]
        if current_inventory < 0.005 * totalClips:
            return 'raise'
        if abs(inventory_delta) > 0.001 * totalClips:
            inventory_history = []
            if inventory_delta > 0 and current_inventory > 0.01 * totalClips:
                return 'lower'
            elif inventory_delta < 0 and current_inventory < 0.1 * totalClips:
                return 'raise'

    def next_purchase(processors, memory):
        if processors is None or memory is None:
            return None
        if processors >= 30 and memory < 70:
            return 'memory'
        if processors < 0.5 * memory:
            return 'processors'
        return 'memory'

    tournament_cooldown = 0
    def run_tournament_periodically():
        nonlocal tournament_cooldown
        if tournament_cooldown > 0:
            tournament_cooldown -= 1
        elif click('btnNewTournament'):
            tournament_cooldown = 240
            strat = Select(driver.find_element_by_id('stratPicker'))
            strat.select_by_index(len(strat.options) - 1)
            click('btnRunTournament')

    def buy_any_upgrade():
        enabled_project_buttons = driver.find_elements_by_css_selector('button.projectButton:enabled')
        enabled_project_buttons = [e for e in enabled_project_buttons if 'Photonic' not in e.text]
        if enabled_project_buttons:
            enabled_project_buttons[0].click()

    def least_monetary_upgrade_cost():
        projects = driver.find_elements_by_css_selector('button.projectButton')
        projects = [p for p in projects if p.is_displayed()]
        def cost(project):
            if '$' in project.text:
                _, _, rest = project.text.partition('$')
                amount = rest.split(')')[0]
                return parse(amount)
        costs = [cost(p) for p in projects if cost(p)]
        if costs:
            return min(costs)

    def withdraw_if_cash_enough():
        cash = elem('investmentBankroll')
        cost = least_monetary_upgrade_cost()
        if cost and cash >= cost:
            click('btnWithdraw')

    def upgrade_computer():
        np = next_purchase(elem('processors'), elem('memory'))
        if np == 'processors':
            click('btnAddProc')
        elif np == 'memory':
            click('btnAddMem')

    def center_slider():
        slider = driver.find_element_by_id('slider')
        if slider:
            w = slider.size['width'] / 2
            ac = ActionChains(driver)
            ac.move_to_element_with_offset(slider, w, 1)
            ac.click()
            ac.perform()
            
    def stage1():
        wire = elem('wire')
        if wire < 500:
            click('btnBuyWire')
        funds = elem('funds')
        wire_price = elem('wireCost')
        clipper_price = elem('clipperCost')
        mega_price = elem('megaClipperCost')
        if clipper_price and funds > wire_price + clipper_price:
            if not mega_price or clipper_price < 0.002 * mega_price:
                click('btnMakeClipper')

        if mega_price and mega_price < 0.8 * funds:
            click('btnMakeMegaClipper')

        rl = raise_or_lower(elem('unsoldClips'))
        if rl == 'lower':
            click('btnLowerPrice')
        elif rl == 'raise':
            click('btnRaisePrice')
        marketing = elem('adCost')
        if marketing < 0.5 * funds:
            click('btnExpandMarketing')


        upgrade_computer()
        invested = elem('portValue')
        engineLevel = elem('investmentLevel')
        if engineLevel is not None and engineLevel < 3:
            click('btnImproveInvestments')
        withdraw_if_cash_enough()

        run_tournament_periodically()
        buy_any_upgrade()

    def stage2():
        buy_any_upgrade()
        upgrade_computer()
        click('btnSynchSwarm')
        click('btnEntertainSwarm')
        farms = elem('farmLevel')
        if farms == 0:
            click('btnMakeFarm')
            farms += 1
        harvesters = elem('harvesterLevelDisplay')
        if harvesters == 0:
            click('btnMakeHarvester')
            harvesters += 1
        wire_drones = elem('wireDroneLevelDisplay')
        if wire_drones == 0:
            click('btnMakeWireDrone')
            wire_drones += 1
        factories = elem('factoryLevelDisplay')
        if factories == 0:
            click('btnMakeFactory')
            factories += 1

        available_matter = elem('availableMatterDisplay')
        acquired_matter = elem('acquiredMatterDisplay')
        wire = elem('nanoWire')

        if farms and harvesters and wire_drones and factories:
            unused = elem('unusedClipsDisplay')
            farm_cost = elem('farmCost')
            if farm_cost * 1000 < unused:
                click('btnFarmx100')
            tower_cost = elem('batteryCost')
            if tower_cost * 1000 < unused:
                click('btnBatteryx100')
            harvester_cost = elem('harvesterCostDisplay')
            if harvester_cost * 10000 < unused:
                click('btnHarvesterx1000')
            wire_drone_cost = elem('wireDroneCostDisplay')
            if wire_drone_cost * 10000 < unused:
                click('btnWireDronex1000')

            energy_consumption = elem('powerConsumptionRate')
            energy_production = elem('powerProductionRate')
            if energy_consumption >= energy_production:
                click('btnMakeFarm')
            else:
                if wire > 0:
                    click('btnMakeFactory')
                else:
                    matter = elem('acquiredMatterDisplay')
                    if matter > 0:
                        click('btnMakeWireDrone')
                    else:
                        click('btnMakeHarvester')
            center_slider()
            run_tournament_periodically()
            if random() < 0.1:
                r = elem('clipmakerRate2')
                u = elem('unusedClipsDisplay')
                fc = elem('factoryCostDisplay')
        if available_matter == 0 and acquired_matter == 0 and wire == 0:
            click('btnHarvesterReboot')
            click('btnWireDroneReboot')
            click('btnFactoryReboot')

    def stage3():
        center_slider()
        buy_any_upgrade()
        upgrade_computer()
        click('btnIncreaseMaxTrust')
        click('btnIncreaseProbeTrust')
        speed = elem('probeSpeedDisplay')
        if speed == 0:
            click('btnRaiseProbeSpeed')
        exploration = elem('probeNavDisplay')
        if exploration == 0:
            click('btnRaiseProbeNav')
        factory = elem('probeFacDisplay')
        if factory == 0:
            click('btnRaiseProbeFac')
        harvester = elem('probeHarvDisplay')
        if harvester == 0:
            click('btnRaiseProbeHarv')
        wire = elem('probeWireDisplay')
        if wire == 0:
            click('btnRaiseProbeWire')
        self_rep = elem('probeRepDisplay')
        hazard = elem('probeHazDisplay')
        if hazard <= self_rep:
            click('btnRaiseProbeHaz')
        else:
            click('btnRaiseProbeRep')

        combat = elem('probeCombatDisplay')
        if combat is not None and combat < 5:
            click('btnLowerProbeHaz')
            click('btnLowerProbeRep')
            click('btnRaiseProbeCombat')
            click('btnRaiseProbeCombat')

        click('btnMakeProbe')

    while True:
        try:
            totalClips = elem('clips')
            if totalClips < 1000:
                click('btnMakePaperclip')
            wire = elem('wire')
            if wire is not None:
                stage1()
            elif driver.find_element_by_id('probeDesignDiv').is_displayed():
                stage3()
            else:
                stage2()
            sleep(0.5)
        except KeyboardInterrupt:
            return
        except Exception as e:
            if totalClips > 10000:
                driver.save_screenshot('YEAHHH')
    

def main():
    driver = start_driver()
    start(driver)

number_words = {
    'thousand': 1e3,
    'million': 1e6,
    'billion': 1e9,
    'trillion': 1e12,
    'quadrillion': 1e15,
    'quintillion': 1e18,
    'sextillion': 1e21,
    'septillion': 1e24,
    'octillion': 1e27,
    'nonillion': 1e30,
    'decillion': 1e33,
    'undecillion': 1e36,
    'duodecillion': 1e39,
    'tredecillion': 1e42,
}

if __name__ == '__main__':
    main()