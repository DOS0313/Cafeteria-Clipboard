import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from dotenv import load_dotenv

import chromedriver_autoinstaller
import os

# 기본 설정
url = 'https://www.instagram.com/'
load_dotenv(verbose=True)

# ChromeDriver 관련 코드
chrome_ver = chromedriver_autoinstaller.get_chrome_version().split('.')[0]

current_path = os.getcwd()
driver_path = f'{current_path}/{chrome_ver}/chromedriver.exe'

if not os.path.exists(driver_path):
    chromedriver_autoinstaller.install(True)
    print(f"install the chrome driver(ver: {chrome_ver})")

# 크롬 옵션
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('window-size=1920x1080')

s = Service(driver_path)
driver = webdriver.Chrome(service=s, options=chrome_options)

# -------------------- 매크로 코드 --------------------

driver.implicitly_wait(10)

driver.get(url)

driver.find_element(By.NAME, "username").send_keys(os.getenv("INSTAGRAM_ID"))
driver.find_element(By.NAME, "password").send_keys(os.getenv("INSTAGRAM_PASS"))
driver.find_element(By.CLASS_NAME, "_acan._acap._acas._aj1-._ap30").click()

time.sleep(10)

driver.find_element(By.CLASS_NAME, "_acan._acap._acas._aj1-._ap30").click()

while(True):
    pass