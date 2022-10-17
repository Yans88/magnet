import _extends from "@babel/runtime/helpers/esm/extends";
import _taggedTemplateLiteralLoose from "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

var _templateObject, _templateObject2;

import React, { useCallback, useContext } from 'react';
import omit from 'lodash/omit';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import { mergeRefs, useClassNames } from '../utils';
import PropTypes from 'prop-types';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import useCustom from '../utils/useCustom';
import NavContext from './NavContext';
import deprecatePropType from '../utils/deprecatePropType';

/**
 * @private
 */
var NavDropdownMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Dropdown.Menu> should be used within a <Nav> component.');
  }

  var onToggle = props.onToggle,
      eventKey = props.eventKey,
      title = props.title,
      _props$classPrefix = props.classPrefix,
      classPrefix = _props$classPrefix === void 0 ? 'dropdown-menu' : _props$classPrefix,
      children = props.children,
      _props$openDirection = props.openDirection,
      openDirection = _props$openDirection === void 0 ? 'end' : _props$openDirection,
      rest = _objectWithoutPropertiesLoose(props, ["onToggle", "eventKey", "title", "classPrefix", "children", "openDirection"]);

  var _useCustom = useCustom('DropdownMenu'),
      rtl = _useCustom.rtl;

  var handleToggleSubmenu = useCallback(function (open, event) {
    onToggle === null || onToggle === void 0 ? void 0 : onToggle(open, eventKey, event);
  }, [eventKey, onToggle]);

  var _useClassNames = useClassNames(classPrefix),
      prefix = _useClassNames.prefix;

  var _useClassNames2 = useClassNames('dropdown-menu'),
      withMenuClassPrefix = _useClassNames2.withClassPrefix,
      mergeMenuClassName = _useClassNames2.merge;

  var _useClassNames3 = useClassNames('dropdown-item'),
      mergeItemClassNames = _useClassNames3.merge,
      withItemClassPrefix = _useClassNames3.withClassPrefix,
      prefixItemClassName = _useClassNames3.prefix; // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.


  var _omit = omit(rest, ['trigger']),
      icon = _omit.icon,
      className = _omit.className,
      disabled = _omit.disabled,
      menuProps = _objectWithoutPropertiesLoose(_omit, ["icon", "className", "disabled"]);

  var Icon = rtl ? AngleLeft : AngleRight;
  return /*#__PURE__*/React.createElement(Menu, {
    openMenuOn: ['mouseover', 'click'],
    renderMenuButton: function renderMenuButton(_ref, buttonRef) {
      var open = _ref.open,
          menuButtonProps = _objectWithoutPropertiesLoose(_ref, ["open"]);

      return /*#__PURE__*/React.createElement(MenuItem, {
        disabled: disabled
      }, function (_ref2, menuitemRef) {
        var selected = _ref2.selected,
            active = _ref2.active,
            menuitem = _objectWithoutPropertiesLoose(_ref2, ["selected", "active"]);

        var classes = mergeItemClassNames(className, prefixItemClassName(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["toggle"]))), withItemClassPrefix({
          'with-icon': icon,
          open: open,
          active: selected,
          disabled: disabled,
          focus: active
        }));
        return /*#__PURE__*/React.createElement("div", _extends({
          ref: mergeRefs(buttonRef, menuitemRef),
          className: classes,
          "data-event-key": eventKey,
          "data-event-key-type": typeof eventKey
        }, menuitem, omit(menuButtonProps, ['role'])), icon && /*#__PURE__*/React.cloneElement(icon, {
          className: prefix('menu-icon')
        }), title, /*#__PURE__*/React.createElement(Icon, {
          className: prefix(_templateObject2 || (_templateObject2 = _taggedTemplateLiteralLoose(["toggle-icon"])))
        }));
      });
    },
    renderMenuPopup: function renderMenuPopup(_ref3, popupRef) {
      var open = _ref3.open,
          popupProps = _objectWithoutPropertiesLoose(_ref3, ["open"]);

      var menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
      return /*#__PURE__*/React.createElement("ul", _extends({
        ref: popupRef,
        className: menuClassName,
        hidden: !open,
        "data-direction": openDirection
      }, popupProps, menuProps), children);
    },
    onToggleMenu: handleToggleSubmenu
  }, function (_ref4, menuContainerRef) {
    var open = _ref4.open,
        menuContainer = _objectWithoutPropertiesLoose(_ref4, ["open"]);

    var classes = mergeItemClassNames(className, withItemClassPrefix({
      disabled: disabled,
      open: open,
      submenu: true
    }));
    return /*#__PURE__*/React.createElement("li", _extends({
      ref: mergeRefs(ref, menuContainerRef),
      className: classes
    }, menuContainer));
  });
});
NavDropdownMenu.displayName = 'Nav.Dropdown.Menu';
NavDropdownMenu.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: deprecatePropType(PropTypes.bool, 'Use openDirection="start" instead.'),
  openDirection: PropTypes.oneOf(['start', 'end']),
  title: PropTypes.node,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onToggle: PropTypes.func
};
export default NavDropdownMenu;