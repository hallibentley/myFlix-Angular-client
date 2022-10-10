import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  movies: any[] = []
  FavoriteMovies: any[] = []

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getMovies();
    this.getFavoriteMovies();
  }

  getUserData(): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      this.userData = resp;
      console.log(this.userData);
      return this.userData;
    });
  };

  getFavoriteMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;

      this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
        this.FavoriteMovies = resp.FavoriteMovies;
        this.movies.forEach((movie) => {
          if (this.FavoriteMovies.some((id) => id === movie._id)) {
            this.FavoriteMovies.push(movie);
          }
        });
        console.log(this.FavoriteMovies);
      });
    });
  }



  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }


  editUserDialog(): void {
    this.dialog.open(EditUserFormComponent, {
      width: "300px"
    });
  }

  deleteUser(): void {
    const username = localStorage.getItem("user") || "";
    if (
      confirm("You are about to delete your profile. This cannot be undone.")
    ) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open("User has been successfully deleted", "OK", {
          duration: 2000
        });
      });
      this.fetchApiData.deleteUser(username).subscribe((resp: any) => {
        localStorage.clear;
      });
    }
  }



  toggleFavorite(id: any): void {
    console.log("add or remove favorite");
    if (this.FavoriteMovies.indexOf(id) > -1) {
      this.deleteFavorite(id);
    } else {
      this.addFavorite(id);
    }
    // check current icon value
    // if in favorites list, call removeFavorite and set icon to favorite_border
    // if not in favorites list, call addFavorite and set icon to favorite
  }

  addFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.addFavorite(id, username).subscribe((resp: any) => {
      console.log(resp);
      // add to favorite list
      this.FavoriteMovies.push(id);
      console.log(this.FavoriteMovies);
      // change icon
    });
  }

  deleteFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.deleteFavorite(username, id).subscribe((resp: any) => {
      console.log(resp);
      // remove from favorite list
      this.FavoriteMovies = this.FavoriteMovies.filter(movie => movie !== id);
      console.log(this.FavoriteMovies);
      // change icon
    });
  }




}