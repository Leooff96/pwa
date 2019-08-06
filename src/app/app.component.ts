import { Component } from '@angular/core';
import { MessagingService } from './shared/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-pwa';
  
  message;

  public installPromptEvent;

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    window.addEventListener('appinstalled', (evt) => {
      console.log('a2hs installed');
    });
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.installPromptEvent = event;
      console.log(event);
    });
  }
  
  request(){
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage

    

  
  }

  getToken(){
    return this.messagingService.getToken();
  }

  click(){

    if(this.installPromptEvent){

      this.installPromptEvent.prompt();
      // Wait for the user to respond to the prompt
    this.installPromptEvent.userChoice.then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      this.installPromptEvent = null;
    });
  }
    
  }
}
