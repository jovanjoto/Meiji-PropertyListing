from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time

def valid_login_admin(driver, webdriverwait):
    driver.get("http://localhost:5173/login")
    email_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "email")))
    password_input = webdriverwait.until(EC.presence_of_element_located((By.ID, "password1")))
    submit_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="root"]/div/div/div/form/button')))

    email_input.clear()
    password_input.clear()

    # Check if invalid email tooltip appears
    email_input.send_keys("admin@admin.com")
    password_input.send_keys("admin")
    submit_button.click()