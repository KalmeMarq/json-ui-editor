export const namespacedSources: Record<string, string> = {};

namespacedSources['common'] = `
{
  "namespace": "common",

  "base_screen": {
    "type": "screen"
  }
}
`;

namespacedSources['play'] = `
{
  "namespace": "play",

  // Screen entrypoint. Do not remove!
  "play_screen": {
    "type": "screen",
    "force_render_below": true,
    "controls": [
      {
        "image0": {
          "type": "image",
          "texture": "grass.png",
          "grayscale": true,
          "size": [50, 50]
        }
      }
    ]
  }
}
`;

namespacedSources['start'] = `
/*
  Exclusive features:
    - renderer[fill_renderer]
    - x/y/width/height/u/v/u_size/v_size/base_width/base_height properties. offset/size/uv/uv_size/base_size are shortcut props here.
    - screens props can use bindings
    - color props can be "#RGB", "#RGBA", "#RRGGBB", "#RRGGBBAA" or [r, g, b, a]
    - row_gap/column_gap (gap)
  Missing features:
    - almost all
    - variables

  Go to features.txt to see which features are already "implemented" 
*/
{
  "namespace": "start",

  "stackpanel0": {
    "type": "stack_panel",
    "orientation": "horizontal",
    "size": [0, 40],
    "column_gap": 4,
    "controls": [
      {
        "0fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [1, 0, 0, 1],
          "size": [40, 40]
        }
      },
      {
        "1fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [0, 1, 0, 1],
          "size": [40, 40]
        }
      },
      {
        "2fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [0, 0, 1, 1],
          "size": [40, 40]
        }
      },
      {
        "3fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [1, 1, 0, 1],
          "size": [40, 40]
        }
      },
      {
        "4fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [0, 1, 1, 1],
          "size": [40, 40]
        }
      },
      {
        "5fill": {
          "type": "custom",
          "renderer": "fill_renderer",
          "color": [1, 0, 1, 1],
          "size": [40, 40]
        }
      }
    ]
  },

  "image0": {
    "type": "image",
    "texture": "grass.png",
    "x": "#x_off",
    "y": "#y_off",
    "size": [100, 100],
    "bindings": [
      {
        "binding_name": "#test_x_off",
        "binding_name_override": "#x_off"
      },
      {
        "binding_name": "#test_y_off",
        "binding_name_override": "#y_off"
      }
    ]
  },

  "fill0": {
    "type": "custom",
    "renderer": "fill_renderer",
    "color": [1, 0, 0, 1],
    "offset": [0, 80],
    "width": "#size",
    "height": "#size",
    "bindings": [
      {
        "binding_name": "#fill0_size",
        "binding_name_override": "#size"
      }
    ]
  },

  "gradv0": {
    "type": "custom",
    "renderer": "gradient_renderer",
    "color1": "#color0",
    "color2": "#color1",
    "offset": [0, 170],
    "size": [80, 80],
    "bindings": [
      {
        "binding_name": "#grad0_color0",
        "binding_name_override": "#color0"
      },
      {
        "binding_name": "#grad0_color1",
        "binding_name_override": "#color1"
      }
    ]
  },

  "gradv1": {
    "type": "custom",
    "renderer": "gradient_renderer",
    "gradient_direction": "horizontal",
    "color1": [1, 0, 1, 1],
    "color2": [0, 0, 1, 1],
    "offset": [90, 170],
    "width": "#width",
    "height": 80,
    "bindings": [
      {
        "binding_name": "#grad1_width",
        "binding_name_override": "#width"
      }
    ]
  },

  "button": {
    "type": "button",
    "size": [100, 20],
    "default_control": "default",
    "hover_control": "hover",
    "locked_control": "locked",
    "button_mappings": [
      {
        "from_button_id": "butto.menu_select",
        "to_button_id": "button.menu_play",
        "mapping_type": "pressed"
      }
    ],
    "controls": [
      {
        "default": {
          "type": "image",
          "texture": "grass.png",
          "uv": [0, 0],
          "uv_size": [100, 20],
          "size": [100, 20]
        }
      },
      {
        "hover": {
          "type": "image",
          "texture": "grass.png",
          "uv": [0, 20],
          "uv_size": [100, 20],
          "size": [100, 20]
        }
      },
      {
        "locked": {
          "type": "image",
          "texture": "grass.png",
          "uv_size": [100, 20],
          "size": [100, 20]
        }
      }
    ]
  },

  "label0": {
    "type": "label",
    "text": "#version",
    "offset": [300, 20],
    "bindings": [
      {
        "binding_name": "#version"
      }
    ]
  },

  // Screen entrypoint. Do not remove!
  "start_screen": {
    "type": "screen",
    "controls": [
      { "stackpanel0@stackpanel0": {} },
      { "image0@image0": {} },
      { "fill0@fill0": {} },
      { "gradv0@gradv0": {} },
      { "gradv1@gradv1": {} },
      { "button@button": {} },
      { "label0@label0": {} },
      {
        "nm": {
          "type": "custom",
          "renderer": "name_tag_renderer",
          "bindings": [
            {
              "binding_name": "#player_nametag",
              "binding_name_override": "#playername"
            },
            {
              "binding_name": "#player_nametag_visible",
              "binding_name_override": "#visible"
            }
          ]
        }
      }
    ]
  }
}`;
