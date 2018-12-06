import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import swal from 'sweetalert2';
import Icon from '@mdi/react';
import {
  mdiArrowTopRightThick,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiDownload,
  mdiEye
} from '@mdi/js';
import color from '../utils/colors';

const Main = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const Wrapper = styled.div`
  height: 100%;
  display: block;
  border-radius: 3px;
  margin-bottom: 15px;
  overflow: hidden;
  background-size: 145px;
  background-color: ${color.voyagerDarkGrey};
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 4);

  &&:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.16);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  max-width: 100%;
  min-width: 100%;
  border-style: none;
`;

const Footer = styled.div`
  background-color: ${props => props.background};
  padding-top: 12px;
  transition: background-color 0.25s;
  box-shadow: 0 0 black;
  margin-top: -20px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Title = styled.div`
  font-weight: 600;
  line-height: 1.14;
  font-size: 14px;
  text-align: left;
  color: white;
  display: inline-block;
  max-height: 45px;
  overflow: hidden;
  padding: 0 15px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  color: hsla(0, 0%, 100%, 0.6);
  min-height: 8px;
`;

const Action = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  opacity: 0.65;
  padding-top: 6px;
  padding-bottom: 12px;
  flex: 1;
  justify-content: center;
  cursor: pointer;

  &&:hover {
    color: white;
    opacity: 1;
  }
`;

const emptyFunc = () => {};

const onEyeButtonClick = url => {
  swal({
    showConfirmButton: false,
    background: `rgba(0,0,0,0)`,
    imageUrl: url,
    animation: false
  });
};

export default class Card extends Component {
  static propTypes = {
    imageModel: PropTypes.object,
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    onEyeButtonClick: PropTypes.func,
    onOpenTabClick: PropTypes.func,
    onDownloadButtonClick: PropTypes.func,
    onCheckboxClick: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func
  };

  static defaultProps = {
    imageModel: {},
    onEyeButtonClick: onEyeButtonClick,
    onOpenTabClick: emptyFunc,
    onDownloadButtonClick: emptyFunc,
    onCheckboxClick: emptyFunc,
    onLoad: emptyFunc,
    onError: emptyFunc
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      hooterColor: color.titleGreyDefault,
      eyeColor: color.paleGrey,
      openTabColor: color.paleGrey,
      downloadColor: color.paleGrey,
      checkboxColor: color.orionGreen
    };
  }

  render() {
    const {
      imageModel,
      src,
      title,
      checked,
      onEyeButtonClick,
      onOpenTabClick,
      onDownloadButtonClick,
      onCheckboxClick,
      onLoad,
      onError
    } = this.props;

    const {
      visible,
      eyeColor,
      openTabColor,
      downloadColor,
      checkboxColor,
      hooterColor
    } = this.state;

    return (
      <Main
        onMouseOver={this.onHover}
        onMouseLeave={this.onLeave}
        visible={visible}
      >
        <Wrapper>
          <ImgWrapper>
            <Img
              src={src}
              alt={src}
              lazyload={'on'}
              async={true}
              onLoad={async event => {
                this.setState({ visible: true });
                onLoad(event, imageModel);
              }}
              onError={async event => onError(event, imageModel)}
            />
          </ImgWrapper>

          <Footer background={hooterColor}>
            <Title>{title}</Title>
            <Actions>
              {/* eye button */}
              <Action
                onMouseOver={this.onMouseOverEye}
                onMouseLeave={this.onMouseLeaveEye}
                onClick={() => onEyeButtonClick(imageModel)}
              >
                <Icon path={mdiEye} size={1} color={eyeColor} />
              </Action>

              {/* open image on new tab */}
              <Action
                onMouseOver={this.onMouseOverOpenTab}
                onMouseLeave={this.onMouseLeaveOpenTab}
                onClick={() => onOpenTabClick(imageModel)}
              >
                <Icon
                  path={mdiArrowTopRightThick}
                  size={1}
                  color={openTabColor}
                />
              </Action>

              {/* download button */}
              <Action
                onMouseOver={this.onMouseOverDownload}
                onMouseLeave={this.onMouseLeaveDownload}
                onClick={() => onDownloadButtonClick(imageModel)}
              >
                <Icon path={mdiDownload} size={1} color={downloadColor} />
              </Action>

              {/* checkbox */}
              <Action
                onMouseOver={this.onMouseOverCheckbox}
                onMouseLeave={this.onMouseLeaveCheckbox}
                onClick={() => onCheckboxClick(imageModel)}
              >
                <Icon
                  path={
                    checked ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline
                  }
                  size={1}
                  color={checkboxColor}
                />
              </Action>
            </Actions>
          </Footer>
        </Wrapper>
      </Main>
    );
  }

  onHover = () => {
    this.setState({ hooterColor: color.titleGreyLight });
  };

  onLeave = () => {
    this.setState({ hooterColor: color.titleGreyDefault });
  };

  onMouseOverEye = () => {
    this.setState({ eyeColor: color.starfleetMediumGrey });
  };

  onMouseLeaveEye = () => {
    this.setState({ eyeColor: color.paleGrey });
  };

  onMouseOverOpenTab = () => {
    this.setState({ openTabColor: color.starfleetMediumGrey });
  };

  onMouseLeaveOpenTab = () => {
    this.setState({ openTabColor: color.paleGrey });
  };

  onMouseOverDownload = () => {
    this.setState({ downloadColor: color.starfleetMediumGrey });
  };

  onMouseLeaveDownload = () => {
    this.setState({ downloadColor: color.paleGrey });
  };

  onMouseOverCheckbox = () => {
    this.setState({ checkboxColor: color.darkMintGreen });
  };

  onMouseLeaveCheckbox = () => {
    this.setState({ checkboxColor: color.orionGreen });
  };
}
