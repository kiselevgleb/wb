const butGet = document.getElementById('butGet');
const inpArt = document.getElementById('inpArt');
const inpSt = document.getElementById('inpSt');
const inpEnd = document.getElementById('inpEnd');
const tab = document.getElementById('tab');
const tabBody = document.getElementById('tab-body');
const ctxB = document.getElementById("barChart");
const body = document.getElementById('head');
const tabTot = document.getElementById('tabTotal');
const tabBodyTot = document.querySelector('#tabbodyTot');
// const tabBodyTot = document.getElementById('tabbodyTot');

butGet.addEventListener('click', (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://wb-back.herokuapp.com?method=allArt&art=${inpArt.value}&dateSt=${inpSt.value}&dateEnd=${inpEnd.value}`, false);
  xhr.send();
  if (xhr.status !== 200) {
    alert(`${xhr.status}: ${xhr.statusText}`);

  } else if(JSON.parse(xhr.responseText).length>0){
    console.log(xhr.responseText);
    filesURL = JSON.parse(xhr.responseText);
    tabBody.innerText = "";
    tabBodyTot.innerText = "";
    tab.style.display = 'table';
    tabTot.style.display = 'table';

    const trTot = document.createElement('tr');
    const tdNameTot = document.createElement('td');
    const tdArtTot = document.createElement('td');
    const tdRevenueTot = document.createElement('td');
    const tdTot = document.createElement('td');
    const tdDateTot = document.createElement('td');
    trTot.appendChild(tdNameTot);
    // trTot.appendChild(tdArtTot);
    trTot.appendChild(tdRevenueTot);
    trTot.appendChild(tdTot);
    trTot.appendChild(tdDateTot);
    tabBodyTot.appendChild(trTot);
    coin = 1;
    let lab = [];
    let stockMas = [];
    let background = [];
    let nameTot;
    let artTot;
    let tot;
    let revenueTot;
    let priceTot;
    let dateTot =inpSt.value + " - " + inpEnd.value;

    filesURL.forEach(element => {
      const tr = document.createElement('tr');
      const thNum = document.createElement('th');
      const tdName = document.createElement('td');
      const tdBr = document.createElement('td');
      const tdArt = document.createElement('td');
      const tdPr = document.createElement('td');
      const tdSt = document.createElement('td');
      const tdDate = document.createElement('td');
      thNum.innerText = coin;
      tdName.innerText = element.name;
      tdBr.innerText = element.brand;
      tdArt.innerText = element.article;
      tdPr.innerText = element.price;
      tdSt.innerText = element.coin;
      tdDate.innerText = element.date;
      tabBody.appendChild(tr);

      tr.appendChild(thNum);
      // tr.appendChild(tdName);
      tr.appendChild(tdBr);
      // tr.appendChild(tdArt);
      tr.appendChild(tdPr);
      tr.appendChild(tdSt);
      tr.appendChild(tdDate);
      coin++;
      nameTot = element.name;
      artTot = element.article;
      priceTot= element.price;
      lab.push(element.date);
      stockMas.push(element.coin);
      background.push('rgba(54, 162, 235, 0.2)');
    });
    tot = Number(filesURL[0].coin) - Number(filesURL[filesURL.length - 1].coin);
    if(tot>0){
    revenueTot = Number(priceTot)*tot;}
    else{
      revenueTot = 0;
    }

    tdNameTot.innerText = nameTot;
    tdArtTot.innerText = artTot;
    tdRevenueTot.innerText = revenueTot;
    tdTot.innerText = tot;
    tdDateTot.innerText = dateTot;

    let ctx = ctxB.getContext('2d');
    ctx.clearRect(0, 0, ctxB.width, ctxB.height);
    let myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: lab,
        datasets: [{
          label: 'Остатки товара на складе по дням',
          data: stockMas,
          backgroundColor: background,
        }]
      },
      options: {
        events: [],
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    return;
  }
  else{
    alert(`Неверный артикул`);
  }

});
