const foods=[{
    name:"Grilled Lamb",
    price:"90000",
    note:"Grilled Lamb legs with onions and some spice",
    image:"images/foody-upload-api-foody-mobile-suon-10-jpg-181121104208.jpg"
},{
    name:"Fried Chiken",
    price:"50000",
    note:"Including 2 wings and chicken legs",
    image:"images/foody-upload-api-foody-mobile-pizza1-190513160013.jpg"
},{
    name:"Roasted duck",
    price:"130000",
    note:"A duck spreads 2 wings",
    image:"images/foody-upload-api-foody-mobile-vqy-jpg-180827105031.jpg"
},{
    name:"Shushi salmon",
    price:"90000",
    note:"salmon and some other seafood",
    image:"images/foody-mobile-10399619_81147453229-527-635863817212109582.jpg"
},{
    name:"Bean Vermicelli",
    price:"50000",
    note:"shrimp sauce and vegetable",
    image:"images/foody-upload-api-foody-mobile-10-200317093749.jpg"
},{
    name:"Fried shrimp",
    price:"60000",
    note:"No matter if it's wimter or summer",
    image:"images/foody-upload-api-foody-mobile-anh-banner-190829105555.jpg"
},{
    name:"King Crab",
    price:"300000",
    note:"No matter if it's wimter or summer",
    image:"images/foody-upload-api-foody-mobile-canadian-lobster-res-180711100420.jpg"
},{
    name:"Grilled BBQ",
    price:"25000",
    note:"No matter if it's wimter or summer",
    image:"images/foody-upload-api-foody-mobile-ddh-200214084711.jpg"
}];
let count = 1;
foods.forEach(item=>{
    item.id = `${count}-food`
    count ++
});

{
    const verifstore = localStorage.getItem('foods');
    if(verifstore === null){
    localStorage.setItem('foods', JSON.stringify(foods));
}
}
export {foods};