import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { Admin } from '../entities/admin.entity';
import { RoleFields } from '../../role/dto/role.dto';

export class CreateAdminDto {
  @IsString({ message: 'le nom  doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom est requis' })
  readonly name: string;

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
    message: 'le telephone doit etre une chaine de caracteres',
  })
  @IsNotEmpty({ message: 'le telephone est requis' })
  readonly tel: string;

  @IsNotEmpty({ message: "le role de l'utilisateur est requis " })
  readonly role: string;
}

export class UpdateAdminDto {
  @IsString({ message: 'le nom  doit etre une chaine de caracteres' })
  @IsNotEmpty({ message: 'le nom est requis' })
  readonly name: string;

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
}
export class AdminFields {
  name: string;
  firstname: string;
  matricule: string;
  password: string;
  token: string;
  email: string;
  status: string;
  identify: string;
  avatar: string;
  tel: string;
  role: object;
  constructor(admin: Admin) {
    this.name = admin.name;
    this.firstname = admin.firstName;
    this.matricule = admin.matricule;
    this.password = admin.password;
    this.token = admin.token;
    this.email = admin.email;
    this.status = admin.status;
    this.identify = admin.identify;
    this.avatar = admin.avatar;
    this.tel = admin.tel;
    this.role = admin.role ? new RoleFields(admin.role) : null;
  }
}
