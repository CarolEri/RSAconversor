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

    //Pego os numeros primos do array para P e Q
    p = primeNumber[Math.floor(Math.random() * primeNumber.length)]

    do{
      q = primeNumber[Math.floor(Math.random() * primeNumber.length)]
    } while (q==p)
    
    //Quanto maior o valor de P(23) e Q(17), mais tempo demora para quebrar a chave privada.
    // p=23
    // q=17

    n = p*q; 
    z = (p-1)*(q-1); 

    e = generate_e(z);
    d = generate_private_key(e, z)


    //Mostro os valores de cada variavel antes de efetuar a criptografia
    window.alert('Valores das variaveis: p='+p+' q='+q+' n='+n+' e='+e+' d='+d)
  
    // e = 3; // Numero maior que 1 e menor que T, primo
    // d = 235; // Inverso multiplicativo modular
  
    chavecrip = crip(e, n, gravaValores, d);

    result.style.textAlign = 'center';
    result.innerHTML = `${chavecrip}`;

    resultDescript.style.textAlign = 'center';
    resultDescript.innerHTML = `${chaveDescript}`;
    _k.preventDefault();
});

//Função para gerar o D
function generate_e(z){
  let var_e;
  
  while(true){
    var_e = Math.floor(Math.random() * ((z-2) + 1) + 2);
    
    if(mdc(z, var_e) == 1){
      return var_e;
    }
  }
}

//Função MDC
function mdc(x, y){
    let rest = 1;
    while(y != 0){
        rest = x%y;
        x = y;
        y = rest;
    }
    return x;
}

//Função para gerar o E
function generate_private_key(e, z){
  let d=0;
  
  while(mod((d*e), z) != 1){
    d++;
  }

  //console.log(d)
  return d;
}

//Função para fazer o MOD = resto da divisão
function mod(x, y){
  if(x < y){
    return x;
  }
  return x%y;
}



/*---------------------------------------------------------------------*
 | Criptografar                                                        | 
 *---------------------------------------------------------------------*/
function crip(e, n, gravaValores, d){
  let cript;
  var chave=[];

  for (let i = 0; i < gravaValores.length; i++) {

    //cript = Math.pow(gravaValores[i], e);
    //cript = mod(cript.toFixed(0), n);
    //console.log(typeof(cript));
    cript = cdn(gravaValores[i], e, n);
    chave.push(cript);
  }

  chaveDescript = descrip(d, n, chave)
  chv = chave.join('')

  return chv;
}


// function cdnCript(gravaValores, e, n) 
// {
//   var value = 1;
//   while (e > 0) {
//     value *= gravaValores;
//     value %= n;
//     e--;
//     console.log(value);
//   }
//   return value;
// }




/*---------------------------------------------------------------------*
 | Descriptografar                                                     | 
 *---------------------------------------------------------------------*/
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



/*--------------------------------------------------------------*
 | Função que faz o calculo:                                    |
 | TEXTO CRIPTOGRAFADO = (TEXTO ORIGINAL ^ E) mod N             |
 | TEXTO ORIGINAL = (TEXTO CRIPTOGRAFADO ^ D) mod N             |
 |                                                              |
 | X é um parâmetro obrigatório, sendo ele as variaveis E ou D  |
 *--------------------------------------------------------------*/
function cdn(chave, X, n) 
{
  var value = 1;
  while (X > 0) {
    value *= chave;
    value %= n;
    X--;
    //console.log(value);
  }
  return value;
}