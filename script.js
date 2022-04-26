var form = document.getElementById('form');
var firstInput = document.getElementById('firstInput');
var result = document.getElementById('result');
var resultDescript = document.getElementById('resultDescript');

const vTotal = 20

form.addEventListener('submit', function(k) {
    let ascii_code = '';
    let total = 0
    let gravaValores = [];
    let p, q, n, z, e, d, numZ1, numZ2;

    total = firstInput.value.length;

    for (let i = 0; i < total; i++) {
      ascii_code = firstInput.value.charCodeAt(i);
      gravaValores.push(ascii_code);

    }

    p = generate_prime();
    q = generate_prime();
    n = 391; 
    numZ1 = geraZ(p); 
    numZ2 = geraZ(q);
    z = numZ1*numZ2; 

    e = 3;
    d = 235;

    chavecrip = crip(e, n, gravaValores, d);

    result.style.textAlign = 'center';
    result.innerHTML = `${chavecrip}`;

    resultDescript.style.textAlign = 'center';
    resultDescript.innerHTML = `${chaveDescript}`;
    k.preventDefault();
});

function generate_prime(){
  let e;
  
  do
    e = Math.floor(Math.random() * vTotal);
  while(!isPrime(e));

  return e;
}

function isPrime(n){
  if (n <= 1)  return false;
  if (n <= 3)  return true;

  if (n%2 == 0 || n%3 == 0) return false;

  for (let i = 5; i*i<=n; i=i+6){
        if (n%i == 0 || n%(i+2) == 0)
           return false;
  }
    
  return true;
}

function generate_e(Z){
  let generated;
  
  while(true){
    generated = Math.floor(Math.random() * ((Z-2) + 1) + 2);
    
    if(mdc(Z, generated) == 1){
      return generated;
    }
  }
}

function mdc(x, y){
    let rest = 1;
    while(y != 0){
        rest = x%y;
        x = y;
        y = rest;
    }
    return x;
}

function geraZ(n){
  if( isPrime(n) ){
    return n - 1;
  }
  alert("Erro de número primo");
}

function generate_private_key(E, Z){
  let d=0;
  
  while(mod(d*E, Z) != 1){
    d++;
  }

  return d;
}

function mod(x, y){
  if(x < y){
    return x;
  }
  return x%y;
}

function crip(e, n, gravaValores, d){
  let cript;
  var chave=[];

  for (let i = 0; i < gravaValores.length; i++) {

    cript = Math.pow(gravaValores[i], e);
    cript = mod(cript.toFixed(2), n);
    chave.push(cript);
  }

  chaveDescript = descrip(d, n, chave)
  chv = chave.join('')

  return chv;
}

function cdn(chave, d, n) 
{
  var value = 1;
  while (d > 0) {
    value *= chave;
    value %= n;
    d--;
    console.log(value);
  }
  return value;
}

function descrip(d, n, chave){
  let descritp;
  let chaveDescript=[];
  let gravaLetras=[];
  let char;
  let chvDescript;

  for (let i = 0; i < chave.length; i++) {
    descript = cdn(chave[i], d, n);
    chaveDescript.push(descript);
  };

  for (let w = 0; w < chaveDescript.length; w++) {
    char = String.fromCharCode(chaveDescript[w]);
    gravaLetras.push(char);
  };

  chvDescript = gravaLetras.join('');
  return chvDescript;
}