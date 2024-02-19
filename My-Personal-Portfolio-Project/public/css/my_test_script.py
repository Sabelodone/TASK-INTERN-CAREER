from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Initialize the WebDriver using WebDriverManager
driver = webdriver.Chrome(ChromeDriverManager().install())

# Test navigation functionality
def test_navigation():
    driver.get("https://Sabelodone.github.io/My-Personal-Portfolio-Project")  # Replace with your website URL
    about_link = driver.find_element(By.LINK_TEXT, "About")
    about_link.click()
    assert "About Me" in driver.title  # Verify that the About page is loaded

    driver.back()  # Go back to the homepage
    projects_link = driver.find_element(By.LINK_TEXT, "My Projects")
    projects_link.click()
    assert "My Projects" in driver.title  # Verify that the Projects page is loaded

# Test form submission functionality
def test_form_submission():
    driver.get("https://Sabelodone.github.io/My-Personal-Portfolio-Project")  # Replace with your contact page URL
    name_input = driver.find_element(By.NAME, "name")  # Update with correct name attribute value
    email_input = driver.find_element(By.NAME, "email")  # Update with correct name attribute value
    message_input = driver.find_element(By.NAME, "message")  # Update with correct name attribute value

    name_input.send_keys("Sabelo Sibaya")
    email_input.send_keys("sabelozondo825@gmail.com")
    message_input.send_keys("This is a test message")

    submit_button = driver.find_element(By.XPATH, "//input[@type='submit']")
    submit_button.click()

    # Wait for success message
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//div[@id='success-message']"))
    )

    assert "Form submitted!" in driver.page_source

# Test accessibility
def test_accessibility():
    driver.get("https://Sabelodone.github.io/My-Personal-Portfolio-Project")  # Replace with your website URL

    # Run accessibility checks using Axe
    with open("axe.min.js", "r") as file:
        axe_script = file.read()

    # Inject Axe script
    driver.execute_script(axe_script)

    # Run accessibility checks
    results = driver.execute_script("axe.run()")
    assert len(results["violations"]) == 0

# Run the tests
if __name__ == "__main__":
    test_navigation()
    test_form_submission()
    test_accessibility()

# Close the WebDriver
driver.quit()

