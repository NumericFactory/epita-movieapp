import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent {

  @Input() movie_id:any;

  commentForm!:FormGroup;
  constructor(private fb:FormBuilder, private userSvc:UserService) {

  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: ['', Validators.minLength(10)],
      movie_id : this.movie_id
    })
  }

  onSubmitCommentForm() {
    console.log(this.commentForm.value)
    if(this.commentForm.valid) {
      this.userSvc.postCommentToApi(this.commentForm.value)
      .subscribe({
        next: (response:any) => { console.log(response.status)},
        error: error => console.error(error)

    })
    }
  }


}
