// Import stylesheets
import './style.css';
import './app.scss';

class SaverApp {
  constructor(appName, appVersion) {
    this.appName = appName;
    this.appVersion = appVersion;

    this.start();
  }

  start() {
    if (localStorage.getItem('userData')) {
      this.app = document.getElementById('app');
      this.generateAllData();
    } else {
      this.app = document.getElementById('app');
      this.welcome();
    }
  }

  generateAllData() {
    const skeleton = {
      username: this.username,
      wallets: [
        {
          id: 1,
          walletType: 'UAH',
          walletName: 'Hryvnia',
          walletShortName: 'hrn',
          walletSign: '₴',
          walletNominals: [
            {
              id: 1,
              value: 1,
              count: 0,
            },

            {
              id: 2,
              value: 2,
              count: 0,
            },

            {
              id: 3,
              value: 5,
              count: 0,
            },

            {
              id: 4,
              value: 10,
              count: 0,
            },

            {
              id: 5,
              value: 20,
              count: 0,
            },

            {
              id: 6,
              value: 50,
              count: 0,
            },

            {
              id: 7,
              value: 100,
              count: 0,
            },

            {
              id: 8,
              value: 200,
              count: 0,
            },

            {
              id: 9,
              value: 500,
              count: 0,
            },

            {
              id: 10,
              value: 1000,
              count: 0,
            },
          ],
        },

        {
          id: 2,
          walletType: 'USD',
          walletName: 'US Dollars',
          walletShortName: 'usd',
          walletSign: '$',
          walletNominals: [
            {
              id: 1,
              value: 1,
              count: 0,
            },

            {
              id: 2,
              value: 5,
              count: 0,
            },

            {
              id: 3,
              value: 10,
              count: 0,
            },

            {
              id: 4,
              value: 20,
              count: 0,
            },

            {
              id: 5,
              value: 50,
              count: 0,
            },

            {
              id: 6,
              value: 100,
              count: 0,
            },
          ],
        },

        {
          id: 3,
          walletType: 'EUR',
          walletName: 'Euro',
          walletShortName: 'eur',
          walletSign: '€',
          walletNominals: [
            {
              id: 1,
              value: 5,
              count: 0,
            },

            {
              id: 2,
              value: 10,
              count: 0,
            },

            {
              id: 3,
              value: 20,
              count: 0,
            },

            {
              id: 4,
              value: 50,
              count: 0,
            },

            {
              id: 5,
              value: 100,
              count: 0,
            },

            {
              id: 6,
              value: 200,
              count: 0,
            },

            {
              id: 7,
              value: 500,
              count: 0,
            },
          ],
        },

        {
          id: 4,
          walletType: 'UAH',
          walletName: 'UA Coins',
          walletShortName: 'hrn',
          walletSign: '₴',
          walletNominals: [
            {
              id: 1,
              value: 0.1,
              count: 0,
            },

            {
              id: 2,
              value: 0.5,
              count: 0,
            },

            {
              id: 3,
              value: 1,
              count: 0,
            },

            {
              id: 4,
              value: 2,
              count: 0,
            },

            {
              id: 5,
              value: 5,
              count: 0,
            },

            {
              id: 6,
              value: 10,
              count: 0,
            },
          ],
        },

        {
          id: 5,
          walletType: 'UAH',
          walletName: 'UA Bank',
          walletShortName: 'hrn',
          walletSign: '₴',
          walletNominals: [
            {
              id: 1,
              value: 0.1,
              count: 0,
            },

            {
              id: 2,
              value: 0.5,
              count: 0,
            },

            {
              id: 3,
              value: 1,
              count: 0,
            },

            {
              id: 4,
              value: 5,
              count: 0,
            },

            {
              id: 5,
              value: 20,
              count: 0,
            },

            {
              id: 6,
              value: 100,
              count: 0,
            },

            {
              id: 7,
              value: 500,
              count: 0,
            },
          ],
        },
      ],
    };

    if (!localStorage.getItem('userData')) {
      localStorage.setItem('userData', JSON.stringify(skeleton));

      this.generatePageWithAllData();
    } else {
      this.generatePageWithAllData();
    }
  }

  generateHeader(userdata) {
    const header = document.createElement('header');
    const totalBalance = () => {
      let balance = 0;

      userdata.wallets.forEach((wallet, iterator) => {
        wallet.walletNominals.forEach((nominal, iterator) => {
          switch (wallet.walletType) {
            case 'UAH':
              balance += (nominal.count * nominal.value) / 41;
              break;
            case 'USD':
              balance += nominal.count * nominal.value;
              break;
            case 'EUR':
              balance += nominal.count * nominal.value * 1.09;
              break;
          }
        });
      });

      return balance;
    };

    const logo = document.createElement('div');
    logo.setAttribute('data-version', `v ${this.appVersion.toFixed(1)}`);
    logo.classList.add('header__logo');
    logo.textContent = this.appName;

    const balance = document.createElement('div');
    balance.classList.add('header__balance');
    balance.textContent =
      '$ ' +
      totalBalance().toLocaleString('en-US', {
        currency: 'UAH',
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
      });
    // append to wrapper

    header.append(logo, balance);

    this.wrapper.appendChild(header);
  }

  generateContent(userdata) {
    let newUserData = userdata;
    const tabWrapper = document.createElement('div');
    tabWrapper.classList.add('tabWrapper');

    // create tabs
    for (let i = 0; i < newUserData.wallets.length; i++) {
      const tab = document.createElement('button');
      userdata.wallets[i].id === this.activeWallet &&
        tab.classList.add('activeTab');
      tab.textContent = userdata.wallets[i].walletName;

      // on click on tab change this.activeWallet to it's ID
      // and update all data;
      tab.addEventListener('click', () => {
        if (i != this.activeWallet - 1) {
          this.activeWallet = i + 1;

          // clean page
          this.app.textContent = '';

          // render app with new data
          this.start();
        }
      });

      tabWrapper.appendChild(tab);
    }

    // create total sum information of active wallet
    const totalSum = document.createElement('div');
    totalSum.classList.add('activeWalletInfo');

    const ownerInfo = document.createElement('span');
    ownerInfo.classList.add('ownerInfo');
    ownerInfo.textContent = 'Wallet owner: ' + newUserData.username;

    const walletType = document.createElement('span');
    walletType.classList.add('walletType');
    walletType.textContent =
      'Active wallet: ' + newUserData.wallets[this.activeWallet - 1].walletName;

    const totalSumOfCategory = () => {
      let total = 0;
      newUserData.wallets[this.activeWallet - 1].walletNominals.forEach(
        (nominal) => {
          total += nominal.value * nominal.count;
        }
      );

      return total;
    };
    const currentBalance = document.createElement('div');
    currentBalance.classList.add('currentBalance');
    currentBalance.innerHTML = `
        <span>${newUserData.wallets[this.activeWallet - 1].walletSign}</span>
        <strong>${totalSumOfCategory().toLocaleString('en-US', {
          currency: 'UAH',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}</strong>
        <b>${newUserData.wallets[this.activeWallet - 1].walletShortName}</b>
      `;

    totalSum.append(ownerInfo, walletType, currentBalance);

    // create wallet table;
    const walletTable = document.createElement('ul');
    walletTable.classList.add('walletTable');

    newUserData.wallets[this.activeWallet - 1].walletNominals.forEach(
      (nominal) => {
        const nominalValue = document.createElement('li');
        nominalValue.textContent = nominal.value.toLocaleString('en-US', {
          currency: 'UAH',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        const nominalCount = document.createElement('li');

        const nominalCountMinus = document.createElement('span');
        nominalCountMinus.classList.add('countMinus');
        nominalCountMinus.textContent = '-';
        nominalCountMinus.addEventListener('click', () => {
          if (nominal.count > 0) {
            //clean old data
            localStorage.removeItem('userData');
            // change count in newUserData;
            nominal.count -= 1;

            // update storage and render page;
            localStorage.setItem('userData', JSON.stringify(newUserData));
            this.app.textContent = '';
            this.start();
          }
        });

        const nominalCountNumber = document.createElement('span');
        nominalCountNumber.classList.add('countNumber');
        nominalCountNumber.textContent = nominal.count.toLocaleString('en-US', {
          currency: 'UAH',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        const nominalCountPlus = document.createElement('span');
        nominalCountPlus.classList.add('countPlus');
        nominalCountPlus.textContent = '+';

        nominalCountPlus.addEventListener('click', () => {
          // clean old data
          localStorage.removeItem('userData');
          // 1 Change count in newUserData
          nominal.count += 1;
          localStorage.setItem('userData', JSON.stringify(newUserData));
          this.app.textContent = '';
          this.start();
        });

        nominalCount.append(
          nominalCountMinus,
          nominalCountNumber,
          nominalCountPlus
        );

        const nominalSum = document.createElement('li');
        nominalSum.textContent =
          (nominal.value * nominal.count).toLocaleString('en-US', {
            currency: 'UAH',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }) + ` ${userdata.wallets[this.activeWallet - 1].walletSign}`;

        walletTable.append(nominalValue, nominalCount, nominalSum);
      }
    );

    this.wrapper.append(tabWrapper, totalSum, walletTable);
  }

  generatePageWithAllData() {
    this.userdata = JSON.parse(localStorage.getItem('userData'));

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    !this.activeWallet && (this.activeWallet = 1);

    this.generateHeader(this.userdata);
    this.generateContent(this.userdata);

    this.app.appendChild(this.wrapper);
  }

  welcome() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    const h1 = document.createElement('h1');
    h1.classList.add('wrapper__title');
    h1.textContent = `Welcome to ${this.appName}!`;

    const p = document.createElement('p');
    p.classList.add('wrapper__description');
    p.textContent = `Hi! I'm really appreciate that you using this app. It's call ${this.appName} ${this.appVersion}. This app will help you to save and control your money by simple usability and functionality. Please enjoy!`;

    const input = document.createElement('input');
    input.setAttribute('placeholder', 'Please enter your name');
    input.classList.add('wrapper__usernameInput');
    input.addEventListener('change', (e) => {
      this.username = e.target.value;
    });

    const button = document.createElement('button');
    button.classList.add('wrapper__usernameSubmit');
    button.textContent = 'Run the app';

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      if (!this.username) {
        input.style = 'border: 3px solid orangered';
        input.setAttribute('placeholder', 'You forgot to enter your name..');

        button.textContent = 'Try again';
      } else {
        this.app.textContent = '';

        this.generateAllData();
      }
    });

    this.wrapper.append(h1, p, input, button);

    this.app.appendChild(this.wrapper);
  }

  about() {
    console.log(`App name: ${this.appName} \ version: ${this.appVersion}`);
  }
}

const myApp = new SaverApp('SAVER', 1.0);
