var form = document.getElementById('form');
var firstInput = document.getElementById('firstInput');
var result = document.getElementById('result');

const vTotal = 20

form.addEventListener('submit', function(k) {
    let ascii_code = '';
    let total = 0
    let gravaValores = [];
    let p, q, n, z, e, d, numZ1, numZ2;
    // alerta o valor do firstInput
    //alert(firstInput.value);
    //console.log(firstInput.value);
    total = firstInput.value.length;
    //console.log(total)

    if(firstInput.value.length == 0 || firstInput.value.length == null){
      window.alert('[Erro] verifique os dados e tente novamente!!!');
      return false;
    }

    for (let i = 0; i < total; i++) {
      ascii_code = firstInput.value.charCodeAt(i);
      //console.log(ascii_code);

      gravaValores.push(ascii_code)
      //console.log(i);
      // more statement
    }

    //console.log(gravaValores)

    p = generate_prime();//pega numero prime p
    q = generate_prime();//pega numero prime q
    n = p*q; //calcula "n" apartir de p e q
    numZ1 = geraZ(p); //Calcula p - 1
    numZ2 = geraZ(q); //Calcula q - 1
    z = numZ1*numZ2; //calcula "z" apartir de p e q

    e = generate_e(z);
    d = generate_private_key(e, z);

    chavecrip = crip(e, n, gravaValores);

    result.style.textAlign = 'center';
    result.innerHTML = `${chavecrip}`;
    //result.innerHTML = `${d}`
  
    // impede o envio do form
    k.preventDefault();
});


//Função que gera números aleatórios primos
function generate_prime(){
  let e;
  
  do
    e = Math.floor(Math.random() * vTotal);
  while(!isPrime(e));

  return e;
}


//Função que verifica se o número gerado é primo
function isPrime(n){
  //se o valor for menos e igual a 1, retorna falso porque não são numeros primos
  if (n <= 1)  return false;
  //se o valor estiver entre 2 e 3 retorna verdadeiro porque já são numeros primos, não precisando de mais validação.
  if (n <= 3)  return true;

  //Caso seja maior entra em validação
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
      //console.log(generated);
      return generated;
    }
  }
}


//função mdc usada para saber se E é um número primo em relação a Z
function mdc(x, y){
    let rest = 1;
    while(y != 0){
        rest = x%y;
        x = y;
        y = rest;
    }
    return x;
}

//Função que subtrai 1 do P e Q
function geraZ(n){
  if( isPrime(n) ){
    return n - 1;
  }
  alert("Erro de número primo");
}

//Gera o valor de D
function generate_private_key(E, Z){
  let d=0;

  // alert('numero: '+ d.toString())
  // alert(E)
  // alert(Z)
  
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

function crip(e, n, gravaValores){
  let cript;
  var chave=[];
  
  // alert(e)
  // alert(n)
  alert(gravaValores)

  for (let i = 0; i < gravaValores.length; i++) {
  
    cript = Math.pow(gravaValores[i], e);
    cript = mod(cript, n);
    chave.push(cript);
  }


  chv = chave.join('')
  return chv;
}