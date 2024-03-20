import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from dotenv import load_dotenv

import chromedriver_autoinstaller
import os

# 기본 설정
url = 'https://www.instagram.com/'
image_path = './assets/images/bg.png'
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
chrome_options.add_experimental_option("mobileEmulation", { "deviceName": "iPhone X" })
chrome_options.add_argument("window-size=375,812")

s = Service(driver_path)
driver = webdriver.Chrome(service=s, options=chrome_options)

# -------------------- 매크로 코드 --------------------

driver.implicitly_wait(10)

driver.get(url)

driver.find_element(By.CLASS_NAME, "x5yr21d._acan._acao._acas._aj1-._ap30").click()

driver.find_element(By.NAME, "username").send_keys(os.getenv("INSTAGRAM_ID"))
driver.find_element(By.NAME, "password").send_keys(os.getenv("INSTAGRAM_PASS"))
driver.find_element(By.CSS_SELECTOR, "#loginForm > div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.xqui205.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1 > div:nth-child(6) > button").click()

time.sleep(5)

driver.find_element(By.CLASS_NAME, "_acan._acap._acas._aj1-._ap30").click()

time.sleep(4)

driver.find_element(By.CLASS_NAME, "_a9--._ap36._a9_1").click()

time.sleep(3)

driver.find_element(By.CSS_SELECTOR, "#mount_0_0_\+2 > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x17snn68.x6osk4m.x1porb0y > section > main > div.x78zum5.x1q0g3np.xl56j7k.xh8yej3 > div > div > div:nth-child(1) > div > div > div > div > div > div:nth-child(1) > button").send_keys(image_path)

while(True):
    pass