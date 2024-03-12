import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentSlide = 1;
  totalSlides = 3; // Update this if you add more slides
  intervalId: any;
  subMenuOpen: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.startSlider();
  }
  toggleMenu() {
    this.subMenuOpen = !this.subMenuOpen;
  }

  

  logout() {
    localStorage.clear()
    sessionStorage.clear()
    this.userService.resetToken()
    this.router.navigate(['']);
  }

  isUserLoggedIn(): boolean {
    // Check if the user is logged in based on session storage or any other logic
    const token = sessionStorage.getItem('token'); // Adjust the key based on your implementation
    
    return token !== null && token !== undefined;
  }

  startSlider() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide % this.totalSlides) + 1;
    this.showSlide(this.currentSlide);
  }

  showSlide(slideNumber: number) {
    const slider = this.el.nativeElement.querySelector('.slider');
    const slideId = `#slide-${slideNumber}`;
    const targetSlide = slider.querySelector(slideId);

    if (targetSlide) {
      const scrollX = targetSlide.offsetLeft - slider.offsetLeft;
      this.renderer.setProperty(slider, 'scrollLeft', scrollX);
      this.resetTimer();
    }
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.startSlider(); // Start the timer again after resetting
  }

  onDotClick(slideNumber: number) {
    this.currentSlide = slideNumber;
    this.showSlide(slideNumber);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
