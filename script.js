var form = document.getElementById('form');
var firstInput = document.getElementById('firstInput');
var result = document.getElementById('result');
var resultDescript = document.getElementById('resultDescript');

const primeNumber = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

form.addEventListener('submit', function(_k) {
    let ascii_code = '';
    let total = 0
    let gravaValores = [];
    let p, q, n, z, e, d;

    total = firstInput.value.length;

    for (let i = 0; i < total; i++) {
      ascii_code = firstInput.value.charCodeAt(i);
      gravaValores.push(ascii_code);

    }


    /*
    p = primeNumber[Math.floor(Math.random() * primeNumber.length)]

    do{
      q = primeNumber[Math.floor(Math.random() * primeNumber.length)]
    } while (q==p)
    */


    //Quanto maior o valor de P(23) e Q(17), mais tempo demora para quebrar a chave privada.
    p=23
    q=17

    n = p*q; 

    z = (p-1)*(q-1); 

    /*
    e = generate_e(z);
    d = generate_private_key(e, z)
    */

    e = 3; // Numero maior que 1 e menor que T, primo
    d = 235; // Inverso multiplicativo modular
  
    chavecrip = crip(e, n, gravaValores, d);

    result.style.textAlign = 'center';
    result.innerHTML = `${chavecrip}`;

    resultDescript.style.textAlign = 'center';
    resultDescript.innerHTML = `${chaveDescript}`;
    _k.preventDefault();
});


function generate_e(z){
  let var_e;
  
  while(true){
    var_e = Math.floor(Math.random() * ((z-2) + 1) + 2);
    
    if(mdc(z, var_e) == 1){
      return var_e;
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


function generate_private_key(e, z){
  let d=0;
  
  while(mod((d*e), z) != 1){
    d++;
  }

  //console.log(d)
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
    cript = mod(cript.toFixed(0), n);
    console.log(typeof(cript));
    //cript = mod(cript, n);
    chave.push(cript);
  }

  chaveDescript = descrip(d, n, chave)
  chv = chave.join('')

  return chv;
}


function descrip(d, n, chave){
  let descript;
  let chaveDescript=[];
  let gravaLetras=[];
  let char;
  let chvDescript;

  for (let i = 0; i < chave.length; i++) {
    descript = cdn(chave[i], d, n);
    //descript = Math.pow(gravaValores[i], d);
    //descript = mod(descript, n);
    chaveDescript.push(descript);
  };

  for (let w = 0; w < chaveDescript.length; w++) {
    char = String.fromCharCode(chaveDescript[w]);
    gravaLetras.push(char);
  };

  chvDescript = gravaLetras.join('');
  return chvDescript;
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