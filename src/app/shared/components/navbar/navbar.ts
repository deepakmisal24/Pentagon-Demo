export class Navbar {
  private navElement: HTMLElement;

  constructor() {
    this.navElement = document.querySelector('.navbar') as HTMLElement;
    this.init();
  }

  private init(): void {
    // Add scroll event listener to change navbar style on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navElement.classList.add('scrolled');
      } else {
        this.navElement.classList.remove('scrolled');
      }
    });
  }
}