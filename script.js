const searchbtn= document.getElementById('search-btn')
const mealList= document.getElementById('meal')
const mealdetailscontent= document.querySelector('Meal-details-content')
const recipeclosebutton = document.getElementById('recipe-close-button')

// event listeners
searchbtn.addEventListener('click',getMeallist);
mealList.addEventListener('click', getMealRecipe);


// get meal list that matches with the ingredients
function getMeallist(){
    let searchinputTxt = document.getElementById('search-Input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchinputTxt}`)
    .then(response => response.json())
    .then(data =>{
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="Meal-item" data-id="${meal.idMeal}" style="border-radius: 2rem; overflow: hidden;background-color: white;">
                        <div class="meal-img" >
                            <img src="${meal.strMealThumb}" alt="food" style="height: 300px;
                            width: 500px;">
                        </div>    
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>       
                    </div>   
                `;
            });
            mealList.classList.remove('notfound');
        } else{
            html="Sorry,we didn't find any meal!";
            mealList.classList.add('notfound');
        }
        mealList.innerHTML = html;
    });

}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-button')){
        let mealItem= e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        })
    }
}