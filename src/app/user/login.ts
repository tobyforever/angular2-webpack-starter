import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Auth} from "../_shared/api/Auth";
import {ForgetPasswordDialog} from "./dialog/forget-password-dialog";


interface LoginForm {
  email?:string;
  password?:string;
}
@Component({
  selector: 'user-login',
  template: require('./login.html'),
  directives: [ForgetPasswordDialog],
  styles: [
    require('./login.scss')
  ]
})
export class UserLogin implements OnInit {
  constructor(private router:Router, private auth:Auth, private route: ActivatedRoute) {
  }

  showDialog=false;
  form:LoginForm = {
    email: '',
    password: ''
  };
  navigation;
  ngOnInit() {
     this.navigation = this.route.snapshot.params['cacheNavigation'];
  }

  error:string;
  pathValidate(path) {
    let cachePath = ['/user/login', '/user/register', 'true'];
    return !!cachePath.find(ele => {
      return path.indexOf(ele) > -1;
    });
  }

  submit() {
    this.error = '';
    this.auth.login(this.form.email, this.form.password).then(()=> {
      if (this.navigation && !this.pathValidate(this.navigation)) {
        return document.location.href = this.navigation;
      }
      this.router.navigate(['/']);
    }).catch((e)=> {
      console.log('error: ', e);
      this.error = '登录失败！请检查用户名或密码';
    });
  }

  _resetPasswordVisible = false;

  showResetPassword() {
    this._resetPasswordVisible = true;
  }

  gotoDialog() {
    this.showDialog = true;
  }

  hideDialog() {
    this.showDialog = false;
  }
}
