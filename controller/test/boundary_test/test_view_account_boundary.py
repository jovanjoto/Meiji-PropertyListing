import pytest
from .utils import valid_login_admin
from test.sample_generation import _create_precondition_data, _delete_precondition_data
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.view_account_boundary
def test_view_account_boundary(driver, webdriverwait):
    _create_precondition_data()
    valid_login_admin(driver, webdriverwait)

    # Wait for the element to appear
    webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div/div/div[2]/div[1]/div")))

    for i in range(1, 101):
        card = webdriverwait.until(EC.presence_of_element_located((By.XPATH, f"/html/body/div/div/div[2]/div[{i}]/div")))
        if "bob@uow.edu.au" in card.text:
            view_button = webdriverwait.until(EC.element_to_be_clickable((By.XPATH, f"/html/body/div/div/div[2]/div[{i}]/div/div/div[2]/button[1]")))
            view_button.click()

            # Check if user modal pops up
            webdriverwait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[2]/div/div/div/div/div")))
            break
    _delete_precondition_data()