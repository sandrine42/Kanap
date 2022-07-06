////////Confirmation de la commande via l'ID qui contient le numéro de commande////////
function confirmation(){
    let params = new URLSearchParams(window.location.search);
    console.log(params)
    const orderId = params.get("id");
    document.getElementById("orderId").innerHTML += `${orderId}`;
    localStorage.clear();
}

confirmation();

