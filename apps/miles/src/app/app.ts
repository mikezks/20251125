import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Your Miles</h2>

    <table class="table table-striped">
      <tr>
        <td>FRA - NYC</td>
        <td>3000 Miles</td>
      </tr>
      <tr>
        <td>FRA - MUC</td>
        <td>300 Miles</td>
      </tr>
      <tr>
        <td>FRA - CDG</td>
        <td>600 Miles</td>
      </tr>
    </table>
  `
})
export class App {
  protected readonly title = signal('miles');
}

export default App;
