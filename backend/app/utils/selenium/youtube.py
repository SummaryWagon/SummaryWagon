from selenium import webdriver

from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.chrome.service import Service as ChromeService

from selenium.webdriver.chrome.options import Options


def get_transcripts(link: str):
    binary_location = '/usr/bin/chromedriver'
    
    options = Options()
    options.add_argument('headless')
    
    driver = webdriver.Chrome(ChromeService=binary_location, options=options)
    driver.get(link)
    
    more_option_btn = driver.find_element(by=By.XPATH, value='//*[@id="button-shape"]/button')
    more_option_btn.click()
    
    show_transcript_btn = driver.find_element(by=By.XPATH, value='//*[@id="items"]/ytd-menu-service-item-renderer[5]')
    show_transcript_btn.click()
    
    test_scripts = driver.find_elements(by=By.CLASS_NAME, value = 'segment-text style-scope ytd-transcript-segment-renderer')
    
    print(test_scripts)
    
    return 1 
    
    
    
       