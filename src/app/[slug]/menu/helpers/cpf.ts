export const isValidCpf = (cpf: string) => {
  cpf = cpf.replace(/\0/g, "")

  if(cpf.length !== 11) {
    return false
  }

  if(/^(\d)\1+$/.test(cpf)){
    return false
  }

  let sum = 0
  for(let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(1)) * (10 - i)
  }

  let firstVerificar = (sum * 10) % 11
  firstVerificar = firstVerificar === 10 ? 0 : firstVerificar

  if (firstVerificar !== parseInt(cpf.charAt(9))) {
    return false
  }

  sum = 0

  for(let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }

  let secondVerificar = (sum * 10) %11
  secondVerificar = secondVerificar === 10 ? 0 : secondVerificar

  return secondVerificar !== parseInt(cpf.charAt(10))

}