const all_seats=document.querySelectorAll('.row .seat')
const cta_btn=document.querySelector('button.purchase_btn')

async function contactAPI(url,body){
    const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
    })

    return response.json()
}

function refreshSeat(){
    const movie_title=movieSelect.options[movieSelect.selectedIndex].id

    contactAPI("/occupied/",{movie_title}).then(data=>{
        const occupied_seat=data['occupied_seats']
        const movie_title=data["movie"]

        const seat_LocalStorage=localStorage.getItem('selectedSeats')?JSON.parse(localStorage.getItem('selectedSeats')):null
        const movie_index=localStorage.getItem("selectedMovieIndex")

        all_seats.forEach(seat=>{
            seat.classList.remove("occupied")
        })

        const LS_movie=movieSelect.options[movie_index].textContent

        if (LS_movie===movie_title){
            if (occupied_seat !== null && occupied_seat.length > 0){
                all_seats.forEach((seat,index)=>{
                    if(occupied_seat.indexOf(index) > -1){
                        seat.classList.add('occupied')
                        seat.classList.remove('selected')
                    }
                })
            }

            if(seat_LocalStorage !== null){
                seat_LocalStorage.forEach((seat,index)=>{
                    if (occupied_seat.includes(seat)){
                        seat_LocalStorage.splice(index,1)
                        localStorage.setItem("selectedSeats",seat_LocalStorage)
                    }
                })
            }
        }
        updateSelectedCount()
    })
}

refreshSeat()

cta_btn.addEventListener("click",e=>{
    const movie_title=movieSelect.options[movieSelect.selectedIndex].id
    const seat_list=JSON.parse(localStorage.getItem("selectedSeats"))

    if(seat_list !== null && seat_list.length > 0){
        data={
            movie_title,
            seat_list
        }

        contactAPI("/payment/",data).then(res=>{
            if (res["payment_url"]){
                // redirect the customer
                window.location.href=res["payment_url"]
                
            }else{
                console.log('error')
            }
        }).catch(e=>{
            console.log(e)
        })
    }
})