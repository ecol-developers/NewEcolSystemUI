import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { sha512 } from "js-sha512";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Login from "./interfaces/login.model";
import { ResponseLoginApi } from "./interfaces/responseLoginApi.model";
import { LoginCredentialMD } from "./interfaces/UR/loginCredentialMD.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }


  loginToUR(obj:Login):Observable<ResponseLoginUR> {
    localStorage.removeItem("tokenUR");
    localStorage.removeItem("token");
    let loginObjUR = this.getLoginObjUR(obj);

    return this.http.post<ResponseLoginUR>("/api/auth/login",loginObjUR);
  }


  authenticate(obj: ResponseLoginUR):void {
    if(obj) {
        localStorage.setItem("tokenUR",obj.accessToken.value);

        this.http.get<ResponseLoginApi>(environment.endpointApiPath+"/Home/Authenticate")
        .subscribe({
          next:(res:ResponseLoginApi)=> {
            console.log("pobrany token: "+res.token);
            console.log("pobrany refreshToken: "+res.refreshToken);
            this.setLocalStorageUserData(res);
          },
          error:(err:string)=> {
            console.error("błąd pobierania z api:",err);
          },
          complete:()=> {
            this.router.navigate(["/dashboard/mainpage"]);
          }
        });
    }
  }

  private getLoginObjUR(obj: Login):LoginCredentialMD {

    let res:LoginCredentialMD = {
      app:"ES",
      hashName:"Sha512",
      hashedPassword:this.getHashedPassword(obj.password),
      login:obj.userName,
      instance:"ESW"
    };

    return res;
  }

  setLocalStorageUserData(res: ResponseLoginApi):void {
    localStorage.setItem("token",res.token);
    localStorage.setItem("refreshToken",res.refreshToken);
    localStorage.setItem("userId", res.id.toString());
    localStorage.setItem("userEmail", res.email);

    this.decodateToken(res);
  }

  decodateToken(res: ResponseLoginApi):void {
    const decodate = JSON.parse(window.atob(res.token.split(".")[1]));
    localStorage.setItem("tokenExp", decodate.exp);
    const rights: string[] =  decodate["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (rights) {
      const admin  = rights.filter(x => x.includes("Administrator"));
      if (admin) {
        localStorage.setItem("admin", "true");
      }
    }
  }


  getHashedPassword(password: string):string {
    let arrayBuffer = sha512.update(password).arrayBuffer();
    let dupa = Buffer.from(arrayBuffer);
    let res = dupa.toString("base64");
    return res;
  }
}