import React from "react";
import { Collapse, Col, Row } from "@douyinfe/semi-ui";
import {
  RectangleSvg,
  TextSvg,
  FadeInSvg,
  FadeOutSvg,
  CreateSvg,
  UnCreateSvg,
} from "@/src/components/svg/index";

const Mobjects = [
  {
    category: "Geometry",
    key: "1",
    objects: [
      {
        name: "Rectangle",
        type: "RectangleNode",
        key: "1-1",
        icon: <RectangleSvg width="32" height="32" />,
      },
    ],
  },
  {
    category: "Text",
    key: "2",
    objects: [
      {
        name: "Text",
        type: "TextNode",
        key: "2-1",
        icon: <TextSvg width="32" height="32" />,
      },
    ],
  },
  {
    category: "Animations",
    key: "3",
    objects: [
      {
        name: "FadeIn",
        type: "FadeInNode",
        key: "3-1",
        icon: <FadeInSvg width="32" height="32" />,
      },
      {
        name: "FadeOut",
        type: "FadeOutNode",
        key: "3-2",
        icon: <FadeOutSvg width="32" height="32" />,
      },
      {
        name: "Create",
        type: "CreateNode",
        key: "3-3",
        icon: <CreateSvg width="32" height="32" />,
      },
      {
        name: "UnCreate",
        type: "UnCreateNode",
        key: "3-4",
        icon: <UnCreateSvg width="32" height="32" />,
      },
    ],
  },
  {
    category: "Utils",
    key: "4",
    objects: [
      {
        name: "Text",
        type: "Text",
        key: "4-1",
        icon: (
          <svg
            t="1714269373958"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6098"
            width="32"
            height="32"
          >
            <path
              d="M853.333333 138.666667H170.666667c-17.066667 0-32 14.933333-32 32v128c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V202.666667h277.333333v618.666666H384c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-96v-618.666666h277.333333V298.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V170.666667c0-17.066667-14.933333-32-32-32z"
              fill="#666666"
              p-id="6099"
            ></path>
          </svg>
        ),
      },
    ],
  },
];

const Libraries = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <Collapse>
      {Mobjects.map((mobject) => {
        return (
          <Collapse.Panel
            header={mobject.category}
            itemKey={mobject.key}
            key={mobject.key}
          >
            <Row>
              {mobject.objects.map((obj) => {
                return (
                  <Col span={6} key={obj.key}>
                    <div
                      draggable
                      onDragStart={(event) => onDragStart(event, obj.type)}
                    >
                      {obj.icon}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Collapse.Panel>
        );
      })}
    </Collapse>
  );
};

export default Libraries;
