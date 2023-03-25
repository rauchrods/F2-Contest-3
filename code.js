var puppeteer = require("puppeteer");


(async () => {


    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://github.com/trending");


    let ansobj={
        repositories:[],
        developers:[]
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
                stars : val.querySelector("div.f6.color-fg-muted.mt-2 > a:nth-child(2)").innerText.trim(),
                today_stars : val.querySelector("div.f6.color-fg-muted.mt-2 > span.d-inline-block.float-sm-right").textContent.trim(),
                forks: val.querySelector("div.f6.color-fg-muted.mt-2 > a.Link--muted.d-inline-block.mr-3:nth-of-type(2)").innerText.trim(),             
                language: val.querySelector(".f6 > span").textContent.trim(),

            }
            if(val.querySelector("p")==null){
                obj["desciption"]="Desxription not addded by the owner";
            }
            else{
                obj["desciption"]=val.querySelector("p").textContent.trim();
            }
            

            arrrepoobj.push(obj);

        }
        return arrrepoobj;

    });
    ansobj["repositories"]=arrrepoobj;

    // console.log("Repos are", arrrepoobj);



  let buttonobj =   await page.evaluate(()=>{
    //    return document.querySelector("div.Box-header.d-md-flex.flex-items-center.flex-justify-between > nav > a:nth-child(2)").click();
       return document.querySelector(".Box-header > nav > a:nth-child(2)").click();

        //devloper button clicked
    });
 
 



   

    // // await page.waitForSelector(".Box");
    // // await page.waitForSelector("#select-menu-language");

    
    // await page.evaluate(()=>{
        //   document.querySelector("#select-menu-language > summary > span").click();
        //    await   page.type("#select-menu-language > details-menu > div.select-menu-filters > filter-input > input", "javascript" , {delay:200});
        //    await document.querySelector("#languages-menuitems > div > a:nth-child(287)").click();
            //devloper button clicked
       
    // });



    // await page.waitForSelector("body > div.logged-in.env-production.page-responsive > div.application-main > main > div.position-relative.container-lg.p-responsive.pt-6 > div ");


    //to get developer list
    // await page.goto("https://github.com/trending");



    //   await page.waitForSelector(".Box>div:nth-child(2)>article");
    

    // let arrdevobj = await page.evaluate(() => {

        
    //     console.log("hi");

    //    let arrdev = querySelectorAll(".Box>div:nth-child(2)>article");
       
    //    let ansarr=[];
    //    for(let data of arrdev){
      
    //      let obj = {
    //       "name": data.querySelector("div:nth-child(3)>div:nth-child(1)>div:nth-child(1)>h1>a").textContent.trim(),
    //      }
         
    //      ansarr.push(obj);
    //    }

    //    return ansarr;

    // });
    // ansobj["developers"]=arrdevobj;
    // console.log("devloper list ", arrdevobj);
    
     
   
   
    

    // await page.type("#your-repos-filter", "f1" , {delay:100});


    console.log(ansobj);
    

    //   await browser.close();
})();


