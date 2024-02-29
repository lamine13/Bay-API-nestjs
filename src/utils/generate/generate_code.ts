import * as crypto from 'crypto';
const charAfterPrefix = 13;
export class GenerateCodeRole {
  generate(prefix ='' ,length: number = charAfterPrefix ) {
    const alpha =this.alpha();
    const numeric =this.numeric();
    const charactere = alpha.concat(numeric) ;
    const code = this.generateCodeFromArray(charactere,length)
    if(prefix != null){
      return `${prefix}${code}`
    }
    return code;
    // const randomString = Math.random()
    //   .toString(10)
    //   .substring(2, charAfterPrefix + 2);
    // if (prefix) {
    //   prefix = prefix.toUpperCase();
    //   return `${prefix}${randomString}`;
    // }
    // return randomString;
  }

  private alpha() {
    return Array.from(Array(26), (_, index) => String.fromCharCode(65 + index));
  }
  private numeric() {
    return Array.from(Array(26), (_, index) => index.toString());
  }
  private generateCodeFromArray(characters: string[], length: number) {
    return Array.from(Array(length), () => {
      const randomIndex = crypto.randomBytes(1)[0] % characters.length;
      return characters[randomIndex];
    }).join('');
  }

}
