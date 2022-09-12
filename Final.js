let userData = document.getElementById('userData')
userEntries=[]

const fetchData = () => {
    let x = localStorage.getItem('user-entries')
    if (x) {
        x=JSON.parse(x)
    } else {
        x = []
    }
    return x
}

let tabulateEntries = () => {
    let fetchedData = fetchData()
    const tableEntries = fetchedData.map((entry) => {
        const nameitem = `<td>${entry.name}</td>`//this is called string interpolation
        const emailitem = `<td>${entry.email}</td>`
        const passworditem = `<td>${entry.password}</td>`
        const dobitem = `<td>${entry.dob}</td>`
        const termsAcceptitem = `<td>${entry.termsAccepted}</td>`

        const row = `<tr>${nameitem} ${emailitem} ${passworditem} ${dobitem} ${termsAcceptitem}</tr>`
        return row
    }).join('\n')

    const table = `<table>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        <th>Dob</th>
        <th>Accepted terms?</th>
        </tr>${tableEntries}
    </table>`

    document.getElementById('user-entries').innerHTML = table
}

const savingData = (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const dob = document.getElementById('dob').value

    const termsAccepted = document.getElementById('acceptTerms').checked

    presentYear = new Date().getFullYear()
    userYear = dob.split('-')[0]
    userAge=presentYear-userYear
    if(userAge<18||userAge>55){
        document.getElementById('dob').style='border:1px solid red'
  return  alert("Sorry! User age must be between 18 to 55")
    }else{
        const enteringData = {
            name, email, password, dob, termsAccepted
        }
        userEntries = fetchData()
        userEntries.push(enteringData)
    
        localStorage.setItem('user-entries', JSON.stringify(userEntries))
        tabulateEntries()
        userData.reset()
    }
}
userData.addEventListener('submit', savingData)
tabulateEntries()


