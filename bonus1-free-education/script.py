import requests 
import json
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.udemy.com')

title_array = []
url_array = []


headers = {'authority': 'www.udemy.com',
           'x-udemy-cache-release': '337f01147663facba345',
           'x-udemy-cache-user': '132838784',
           'x-udemy-cache-modern-browser': '1',
           'authorization': 'Bearer ZbiAbgFL9kJrVKedvIP8XaEzwaOUcid88FQVvOvQ',
           'x-udemy-authorization': 'Bearer ZbiAbgFL9kJrVKedvIP8XaEzwaOUcid88FQVvOvQ',
           'referer': 'https://www.udemy.com/courses/search/?price=price-free&q=free&sort=newest',
           'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36'
           }


a = requests.get('https://www.udemy.com/api-2.0/search-courses/?price=price-free&q=free&sort=newest&skip_price=true', headers=headers)

b = requests.get('https://www.udemy.com/api-2.0/search-courses/?p=2&price=price-free&q=free&sort=newest&skip_price=true', headers=headers)

c = requests.get('https://www.udemy.com/api-2.0/search-courses/?p=3&price=price-free&q=free&sort=newest&skip_price=true', headers=headers)

d = requests.get('https://www.udemy.com/api-2.0/search-courses/?p=4&price=price-free&q=free&sort=newest&skip_price=true', headers=headers)

e = requests.get('https://www.udemy.com/api-2.0/search-courses/?p=5&price=price-free&q=free&sort=newest&skip_price=true', headers=headers)



response1 = a.text
response_json1= json.loads(response1)

response2 = b.text
response_json2= json.loads(response2)

response3 = c.text
response_json3= json.loads(response3)

response4 = d.text
response_json4= json.loads(response4)

response5 = e.text
response_json5= json.loads(response5)




for p in response_json1['courses']:
    title_array.append(str(p['title']))
    url_array.append(str(p['url']))


for p in response_json2['courses']:
    title_array.append(str(p['title']))
    url_array.append(str(p['url']))

for p in response_json3['courses']:
    title_array.append(str(p['title']))
    url_array.append(str(p['url']))

for p in response_json4['courses']:
    title_array.append(str(p['title']))
    url_array.append(str(p['url']))

for p in response_json5['courses']:
    title_array.append(str(p['title']))
    url_array.append(str(p['url']))
    


with open('listfile.txt', 'w') as filehandle:
    filehandle.writelines("%s\n" % place for place in title_array)

with open('listfile.txt', 'a') as filehandle:
    filehandle.writelines("%s\n" % place for place in url_array)

