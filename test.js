const chrome = require("selenium-webdriver/firefox");
const { Builder, By, Key, until } = require("selenium-webdriver");

async function googleSearch() {
  let driver = await new Builder()
    .forBrowser("firefox")
    .setChromeOptions()
    .usingServer("http://localhost:4444/wd/hub/")
    .build();

  try {
    await driver.get("https://www.google.com");
    await driver
      .findElement(By.name("q"))
      .sendKeys("nahipachi", Key.ENTER);

    let firstResult = await driver.wait(
      until.elementLocated(By.css("h3")),
      10000
    );

    console.log(await firstResult.getAttribute("textContent"));
    console.log(await (await driver.getCapabilities()).getBrowserName());
    console.log(await (await driver.getCapabilities()).getBrowserVersion());
  } finally {
    driver.quit();
  }
}

googleSearch("firefox");
