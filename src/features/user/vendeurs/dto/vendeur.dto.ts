import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Vendeur } from '../entities/vendeur.entity';
import * as moment from 'moment';
import { RoleFields } from '../../role/dto/role.dto';

export class CreateVendeurDto {
  @IsString({ message: 'le nom  doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom est requis' })
  readonly name: string;
  @IsString({ message: 'le prenom  doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le prenom est requis' })
  readonly firstname: string;

  @IsString({ message: "l'identite doit etre une chaine de caracteres" })
  @IsNotEmpty({ message: "l'identite est requis" })
  readonly identity: string;

  @IsString({
    message: "le numero d'identite doit etre une chaine de caracteres",
  })
  @IsNotEmpty({ message: "le numero d'identite est requis" })
  readonly numberIdentity: string;

  @IsNotEmpty({ message: "le genre de l'utilisateur est requis " })
  readonly gender: string;

  @IsString({ message: 'le prenom doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le prenom est requis' })
  readonly firstName: string;

  @IsString({ message: 'le mot de passe doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: "le mot de passe de l'utilisateur est requis" })
  readonly password: string;

  @IsString({ message: "l'email doit etre une chaine de caracteres" })
  @IsNotEmpty({ message: "l'email est requis" })
  @IsEmail()
  readonly email: string;

  @IsString({ message: 'le statut doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le statut est requis' })
  readonly status: boolean;

  @IsPhoneNumber(undefined, {
    message: 'le telephone doit etre un numero de telephone',
  })
  @IsNotEmpty({ message: 'le telephone est requis' })
  readonly tel: string;

  @IsNotEmpty({ message: "le role de l'utilisateur est requis " })
  readonly role: string;

  @IsNotEmpty({ message: 'la date de naissance  est requis ' })
  @Type(() => Date)
  @IsDate({ message: 'Ce champs dois etre de type date' })
  readonly birthday: Date;
}

export class UpdateVendeurDto {
  @IsString({ message: 'le nom  doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom est requis' })
  readonly name: string;

  @IsNotEmpty({ message: "le genre de l'utilisateur est requis " })
  readonly gender: string;

  @IsString({ message: 'le prenom doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le prenom est requis' })
  readonly firstName: string;

  @IsString({ message: 'le mot de passe doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: "le mot de passe de l'utilisateur est requis" })
  readonly password: string;

  @IsString({ message: "l'email doit etre une chaine de caracteres" })
  @IsNotEmpty({ message: "l'email est requis" })
  @IsEmail()
  readonly email: string;

  @IsString({ message: 'le statut doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le statut est requis' })
  readonly status: boolean;

  @IsPhoneNumber(undefined, {
    message: 'le telephone doit etre un numero de telephone',
  })
  @IsNotEmpty({ message: 'le telephone est requis' })
  readonly tel: string;

  @IsNotEmpty({ message: "le role de l'utilisateur est requis " })
  readonly role: string;

  @IsNotEmpty({ message: 'la date de naissance  est requis ' })
  @Type(() => Date)
  @IsDate({ message: 'Ce champs dois etre de type date' })
  readonly birthday: Date;
}

export class VendeurFields {
  name: string;
  firstname: string;
  matricule: string;
  password: string;
  token: string;
  identity: string;
  numberIdentity: string;
  email: string;
  status: string;
  identify: string;
  avatar: string;
  tel: string;
  role: object;
  birthday: string;
  gender: string;
  constructor(vendeur: Vendeur) {
    this.name = vendeur.name;
    this.firstname = vendeur.firstName;
    this.matricule = vendeur.matricule;
    this.password = vendeur.password;
    this.token = vendeur.token;
    this.email = vendeur.email;
    this.status = vendeur.status;
    this.identify = vendeur.identify;
    this.identify = vendeur.numberIdentity;
    this.identify = vendeur.identify;
    this.avatar = vendeur.avatar;
    this.tel = vendeur.tel;
    this.gender = vendeur.gender;
    this.birthday = moment(vendeur.birthday).format('YYYY-MM-DD');
    this.role = vendeur.role ? new RoleFields(vendeur.role) : null;
  }
}
