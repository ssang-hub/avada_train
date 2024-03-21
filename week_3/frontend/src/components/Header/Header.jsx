import { ActionList, Icon, InlineStack, Text, TopBar } from "@shopify/polaris";
import {
  ArrowLeftIcon,
  NotificationIcon,
  SmileyNeutralIcon,
} from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [{ content: "Back to Shopify", icon: ArrowLeftIcon }],
        },
        {
          items: [{ content: "Community forums" }],
        },
      ]}
      name="Dharma"
      initials="D"
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <InlineStack wrap={false}>
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon source={SmileyNeutralIcon} />
            <Text as="span" visuallyHidden>
              Secondary menu
            </Text>
          </span>
        }
      />
      <TopBar.Menu
        activatorContent={
          <span>
            <Icon source={NotificationIcon} />
            <Text as="span" visuallyHidden>
              Secondary menu
            </Text>
          </span>
        }
        open={isSecondaryMenuOpen}
        onOpen={toggleIsSecondaryMenuOpen}
        onClose={toggleIsSecondaryMenuOpen}
        actions={[
          {
            items: [{ content: "Community forums" }],
          },
        ]}
      />
    </InlineStack>
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );
}

export default Header;
