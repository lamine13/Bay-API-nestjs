const charAfterPrefix = 10;
export class GenerateCodeMatricule {
  // generate(prefix?:string): string {
  //   const randomString = Math.random().toString(10).substring(charAfterPrefix);
  //   if(prefix) {
  //     return  `matricule${randomString}${prefix}`;
  //   }
  //   return randomString;
  // }

  generate(gender: string, dateBirthday: Date, number: string): string {
    const codeGender =
      gender.toLowerCase() === 'masculine'
        ? '71'
        : gender.toLowerCase() === 'feminine'
          ? '72'
          : '';

    const year = new Date(dateBirthday).getFullYear();
    const month = (new Date(dateBirthday).getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const jour = new Date(dateBirthday).getDate().toString().padStart(2, '0');
    const dateBirthdayFormatted = `${year}${month}${jour}`;

    const numberAleatory = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const numberStr = number.toString().padStart(2, '0');

    return `${codeGender}${dateBirthdayFormatted}${numberAleatory}${numberStr}`;
  }

  getCodeUnique(code: string, chain: string): string {
    const mots = chain.split('');

    if (mots.length === 1) {
      const consonants = chain.replace(/[^bcdfghjklmnpqrstvwxyz]/g, '');
      return `${code}-${consonants.toUpperCase()}`;
    } else {
      const initials = mots.map((mot) => mot[0]).join('');
      return `${code}-${initials.toUpperCase()}`;
    }
  }
}
