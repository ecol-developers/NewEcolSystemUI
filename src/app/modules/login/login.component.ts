import { Component} from "@angular/core";
import Login from "./interfaces/login.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";
import { LoginService } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  public loginObj:Login = {
    password:"",
    userName:""
  };
  constructor(
    private loginService:LoginService
  ) { }

  login():void {

    this.loginService.loginToUR(this.loginObj).subscribe({
      next:(res:ResponseLoginUR)=> {
        this.loginService.authenticate(res);
      },
      error:(err:string)=> {
        console.error(err);
      }
    });
  }


}