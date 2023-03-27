var puppeteer = require("puppeteer");


(async () => {


    const browser = await puppeteer.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto("https://github.com/trending");


    let ansobj = {
        repositories: [],
        developers: []
    }



    // await page.waitForSelector("body"); 
    await page.waitForSelector(".Box");
    await page.waitForSelector(".Box-row");

    let arrrepoobj = await page.evaluate(() => {
        let repoarr = document.querySelectorAll(".Box .Box-row");

        // repoarr.forEach((element) => {
        //     console.log(element.textContent);
        // });

        let arrrepoobj = [];
        for (let val of repoarr) {

            let obj = {

                title: val.querySelector(".h3 > a ").textContent.trim(),
                desciption: "",
                url: val.querySelector(".h3>a").getAttribute("href"),
                stars: val.querySelector("div.f6.color-fg-muted.mt-2 > a:nth-child(2)").innerText.trim(),
                today_stars: val.querySelector("div.f6.color-fg-muted.mt-2 > span.d-inline-block.float-sm-right").textContent.trim(),
                forks: val.querySelector("div.f6.color-fg-muted.mt-2 > a.Link--muted.d-inline-block.mr-3:nth-of-type(2)").innerText.trim(),
                language: val.querySelector(".f6 > span").textContent.trim(),

            }
            if (val.querySelector("p") == null) {
                obj["desciption"] = "Desxription not addded by the owner";
            }
            else {
                obj["desciption"] = val.querySelector("p").textContent.trim();
            }


            arrrepoobj.push(obj);

        }
        return arrrepoobj;

    });
    ansobj["repositories"] = arrrepoobj;

    // console.log("Repos are", arrrepoobj);



    // await page.evaluate(()=>{
    // //    return document.querySelector("div.Box-header.d-md-flex.flex-items-center.flex-justify-between > nav > a:nth-child(2)").click();
    //    document.querySelector(".Box-header > nav > a:nth-child(2)").click();


    //     //devloper button clicked
    // });

    var devbutton = await page.$("a[href='/trending/developers']");
    await devbutton.click();





    // // await page.waitForSelector(".Box");
    await page.waitForSelector("a[href='/trending/developers/javascript?since=daily']");



    await page.evaluate(() => {
        document.querySelector("a[href='/trending/developers/javascript?since=daily']").click();

        // JS button clicked

    });



    // await page.waitForSelector("body > div.logged-in.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div ");


    //to get developer list

    // await page.goto("https://github.com/trending/developers");



    await page.waitForSelector(".Box>div:nth-child(2)");


    let arrdevobj = await page.evaluate(() => {


        let arrdev = Array.from(document.querySelectorAll(".Box>div:nth-child(2)>article"));
        //    arrdev.array.forEach((element) => {
        //          console.log(element.textContent);
        //    });

        let ansarr = [];

        arrdev.forEach((data) => {
           
                var name =  data.querySelector("div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>h1>a").textContent.trim();
                //   "username": data.querySelector("div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>p").innerText,
                // var reponame = data.querySelector(".h4").textContent.trim();
                // var desc="desc not defined";
                // if(data.querySelector("div:nth-child(3)>div:nth-child(1)>div:nth-child(2)>div>article>div:nth-child(3)").innerText!=null){
                //    desc = data.querySelector("div:nth-child(3)>div:nth-child(1)>div:nth-child(2)>div>article>div:nth-child(3)").innerText;
                // }
                
               
            

            ansarr.push({
                "name": name,
                // "reponame":reponame
                // "desc": desc,
            });

        });

        return ansarr;

    });
    ansobj["developers"] = arrdevobj;
    // console.log("devloper list ", arrdevobj);






    // await page.type("#your-repos-filter", "f1" , {delay:100});


    console.log(ansobj);


    //   await browser.close();
})();

