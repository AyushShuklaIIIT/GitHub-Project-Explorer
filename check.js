const checkAsync = async() => {
    const response = await fetch(`https://api.github.com/repos/AyushShuklaIIIT/Sahyatri/contributors?per_page=3`);
    const data = await response.json();
    console.log(data);
    const finalData = data.map(el => el.login);
    console.log(finalData);
}

checkAsync();