const DropMenuClick = (function () {
  function use(
    dropMenuItemHideClass,
    {
      dropMenuParentSelector = ".drop-menu-click",
      dropMenuTitleSelector = ".drop-menu-title",
      dropMenuItemsContainerSelector = ".drop-menu-items-container",
    } = {}
  ) {
    const allDropMenuClick = document.querySelectorAll(dropMenuParentSelector);
    allDropMenuClick.forEach((dropMenu) => {
      const dropMenuTitle = dropMenu.querySelector(dropMenuTitleSelector);
      const dropMenuItemContainer = dropMenu.querySelector(
        dropMenuItemsContainerSelector
      );

      if (!dropMenuTitle || !dropMenuItemContainer) return;

      if (!dropMenuItemHideClass) dropMenuItemContainer.style.display = "none";
      else dropMenuItemContainer.classList.add(dropMenuItemHideClass);

      dropMenuTitle.addEventListener("click", (event) => {
        event.stopPropagation();

        if (!dropMenuItemHideClass) {
          if (dropMenuItemContainer.style.display === "none")
            dropMenuItemContainer.style.display = "block";
          else dropMenuItemContainer.style.display = "none";
        } else dropMenuItemContainer.classList.toggle(dropMenuItemHideClass);
      });
    });
  }

  return {
    use,
  };
})();

const DropMenuHover = (function () {
  function use(
    dropMenuItemHideClass,
    {
      dropMenuParentSelector = ".drop-menu-hover",
      dropMenuTitleSelector = ".drop-menu-title",
      dropMenuItemsContainerSelector = ".drop-menu-items-container",
    } = {}
  ) {
    const allDropMenuHover = document.querySelectorAll(dropMenuParentSelector);
    allDropMenuHover.forEach((dropMenu) => {
      const dropMenuTitle = dropMenu.querySelector(dropMenuTitleSelector);
      const dropMenuItemContainer = dropMenu.querySelector(
        dropMenuItemsContainerSelector
      );

      if (!dropMenuTitle || !dropMenuItemContainer) return;

      if (!dropMenuItemHideClass) dropMenuItemContainer.style.display = "none";
      else dropMenuItemContainer.classList.add(dropMenuItemHideClass);

      dropMenu.style.position = "relative";
      dropMenuItemContainer.style.position = "absolute";

      dropMenuTitle.addEventListener("mouseenter", () => {
        if (!dropMenuItemHideClass)
          dropMenuItemContainer.style.display = "block";
        else dropMenuItemContainer.classList.remove(dropMenuItemHideClass);
      });

      dropMenu.addEventListener("mouseleave", () => {
        if (!dropMenuItemHideClass)
          dropMenuItemContainer.style.display = "none";
        else dropMenuItemContainer.classList.add(dropMenuItemHideClass);
      });
    });
  }

  return {
    use,
  };
})();

export { DropMenuClick, DropMenuHover };
