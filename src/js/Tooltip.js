export default class Tooltip {
  constructor() {
    this.tooltips = [];
  }

  addTooltip(message) {
    const id = performance.now();

    const tooltip = document.createElement('div');
    tooltip.className = 'modal__error';
    tooltip.textContent = message;

    this.tooltips.push({
      id,
      tooltip,
    });

    document.querySelector('.modal__body').appendChild(tooltip);

    setTimeout(() => this.removeTooltip(id), 3000);

    return id;
  }

  removeTooltip(id) {
    const removing = this.tooltips.findIndex((tooltip) => tooltip.id === id);

    if (removing === -1) return;

    this.tooltips[removing].tooltip.remove();
    this.tooltips.splice(removing, 1);
  }
}
