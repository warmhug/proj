import React from 'react';
import { Button, Modal } from 'antd';
import {
  useView,
  Compiler,
  Knobs,
  Editor,
  Error,
  ActionButtons,
  Placeholder,
  PropTypes,
} from 'react-view';

const SIZE = {
  default: "default",
  small: "small",
  large: "large",
};

export default function Main() {
  const params = useView({
    componentName: "Button",
    props: {
      children: {
        value: "Hello",
        type: PropTypes.ReactNode,
        description: `Visible label.`,
      },
      size: {
        value: "SIZE.default",
        defaultValue: "SIZE.default",
        options: SIZE,
        type: PropTypes.Enum,
        description: "Defines the size of the button.",
        imports: {
          "antd": {
            named: ["SIZE"],
          },
        },
      },
      onClick: {
        value: '() => alert("click")',
        type: PropTypes.Function,
        description: `Function called when button is clicked.`,
      },
      disabled: {
        value: false,
        type: PropTypes.Boolean,
        description: "Indicates that the button is disabled",
      },
    },
    scope: {
      Button,
      SIZE,
    },
    imports: {
      "antd": {
        named: ["Button"],
      },
    },
  });
  return (
    <div>
      <Compiler
        {...params.compilerProps}
        minHeight={62}
        placeholder={Placeholder}
      />
      <Error msg={params.errorProps.msg} isPopup />
      <Knobs {...params.knobProps} />
      <Editor {...params.editorProps} data-testid="rv-editor" />
      <Error {...params.errorProps} />
      <ActionButtons {...params.actions} />
    </div>
  );
}
