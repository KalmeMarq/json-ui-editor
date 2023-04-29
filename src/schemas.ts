export const globalVarsSchema = `{
  "$schema": "http://json-schema.org/schema",
  "type": "object"
}`;

export const screenDefsSchema = `{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "patternProperties": {
    "[a-zA-Z0-9_]+": {
      "type": "object",
      "properties": {
        "bindings": {
          "type": "object"
        }
      }
    }
  }
}`;

export const uiDefsSchema = `{
  "$schema": "http://json-schema.org/schema",
  "type": "object",
  "properties": {
    "ui_defs": {
      "type": "array",
      "description": "All ui files used",
      "items": {
        "type": "string",
        "description": "UI file path begining from pack root"
      }
    }
  }
}`;

export const uiSchema = {
  $schema: 'http://json-schema.org/draft-07/schema',
  type: 'object',
  definitions: {
    ui_control: {
      type: 'object',
      description:
        'UI element\nGlobal Variables: $store_disabled | $game_pad | $mouse | $touch | $trial | $build_platform_UWP | $win10_edition | $ignore_add_servers | $disable_gamertag_controls | $console_edition | $osx_edition | $pocket_edition | $education_edition | $world_archive_support | $file_picking_supported | $desktop_screen | $pocket_screen | $is_holographic | $gear_vr | $oculus_rift | $is_living_room_mode | $is_reality_mode | $realms_beta | $fire_tv | $is_ios | $apple_tv | $is_windows_10_mobile | $image_picking_not_supported | $pre_release | $ios | $is_console | $can_quit | $is_settopbox | $microsoft_os | $apple_os | $google_os | $nx_os | $horizontal_safezone_size | $vertical_safezone_size | $can_splitscreen | $is_secondary_client | $multiplayer_requires_live_gold | $xbox_one | $is_pregame | $is_win10_arm | $vibration_supported | $is_mobile_vr | $is_xboxlive_enabled | $device_must_be_removed_for_xbl_signin | $is_publish | $is_desktop | $is_ps4 | $is_on_3p_server | $ignore_3rd_party_servers | $is_berwick | $edit_mode',
      additionalProperties: false,
      properties: {
        // Exclusive
        gap: {
          markdownDescription: '`***Type***: ```Stack Panel```\t\n\t\nExcluvive',
          oneOf: [{ type: 'array', item: { type: 'number' } }, { $ref: '#/definitions/vl:variable' }]
        },
        row_gap: {
          markdownDescription: '**Type**: ```Stack Panel```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        column_gap: {
          markdownDescription: '**Type**: ```Stack Panel```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        x: {
          markdownDescription: '**Type**: ```Any```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        y: {
          markdownDescription: '**Type**: ```Any```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        width: {
          markdownDescription: '**Type**: ```Any```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        height: {
          markdownDescription: '**Type**: ```Any```\t\n\t\nExcluvive',
          oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
        },
        //

        type: { $ref: '#/definitions/nm:type' },
        controls: { $ref: '#/definitions/nm:controls' },
        variables: { $ref: '#/definitions/nm:variables' },
        modifications: { $ref: '#/definitions/nm:modifications' },
        ignored: { $ref: '#/definitions/nm:ignored' },
        // Animations
        anims: { $ref: '#/definitions/prop:anims' },
        disable_anim_fast_forward: { $ref: '#/definitions/prop:disable_anim_fast_forward' },
        animation_reset_name: { $ref: '#/definitions/prop:animation_reset_name' },
        // Animations Element (Independent of the UI elements)
        anim_type: { $ref: '#/definitions/anim_prop:anim_type' },
        duration: { $ref: '#/definitions/anim_prop:duration' },
        next: { $ref: '#/definitions/anim_prop:next' },
        destroy_at_end: { $ref: '#/definitions/anim_prop:destroy_at_end' },
        play_event: { $ref: '#/definitions/anim_prop:play_event' },
        end_event: { $ref: '#/definitions/anim_prop:end_event' },
        start_event: { $ref: '#/definitions/anim_prop:start_event' },
        reset_event: { $ref: '#/definitions/anim_prop:reset_event' },
        easing: { $ref: '#/definitions/anim_prop:easing' },
        from: { $ref: '#/definitions/anim_prop:from' },
        to: { $ref: '#/definitions/anim_prop:to' },
        initial_uv: { $ref: '#/definitions/anim_prop:initial_uv' },
        fps: { $ref: '#/definitions/anim_prop:fps' },
        frame_count: { $ref: '#/definitions/anim_prop:frame_count' },
        frame_step: { $ref: '#/definitions/anim_prop:frame_step' },
        reversible: { $ref: '#/definitions/anim_prop:reversible' },
        resettable: { $ref: '#/definitions/anim_prop:resettable' },
        scale_from_starting_alpha: { $ref: '#/definitions/anim_prop:scale_from_starting_alpha' },
        activated: { $ref: '#/definitions/anim_prop:activated' },
        // Control
        visible: { $ref: '#/definitions/prop:visible' },
        enabled: { $ref: '#/definitions/prop:enabled' },
        layer: { $ref: '#/definitions/prop:layer' },
        z_order: { $ref: '#/definitions/prop:z_order' },
        alpha: { $ref: '#/definitions/prop:alpha' },
        propagate_alpha: { $ref: '#/definitions/prop:propagate_alpha' },
        clips_children: { $ref: '#/definitions/prop:clips_children' },
        allow_clipping: { $ref: '#/definitions/prop:allow_clipping' },
        clip_offset: { $ref: '#/definitions/prop:clip_offset' },
        clip_state_change_event: { $ref: '#/definitions/prop:clip_state_change_event' },
        enable_scissor_test: { $ref: '#/definitions/prop:enable_scissor_test' },
        property_bag: { $ref: '#/definitions/prop:property_bag' },
        selected: { $ref: '#/definitions/prop:selected' },
        use_child_anchors: { $ref: '#/definitions/prop:use_child_anchors' },
        // Layout
        anchor_from: { $ref: '#/definitions/prop:anchor_from' },
        anchor_to: { $ref: '#/definitions/prop:anchor_to' },
        contained: { $ref: '#/definitions/prop:contained' },
        draggable: { $ref: '#/definitions/prop:draggable' },
        follows_cursor: { $ref: '#/definitions/prop:follows_cursor' },
        offset: { $ref: '#/definitions/prop:offset' },
        size: { $ref: '#/definitions/prop:size' },
        max_size: { $ref: '#/definitions/prop:max_size' },
        min_size: { $ref: '#/definitions/prop:min_size' },
        inherit_max_sibling_width: { $ref: '#/definitions/prop:inherit_max_sibling_width' },
        inherit_max_sibling_height: { $ref: '#/definitions/prop:inherit_max_sibling_height' },
        // Anchored Offset
        use_anchored_offset: { $ref: '#/definitions/prop:use_anchored_offset' },
        // Stack Panel
        orientation: { $ref: '#/definitions/prop:orientation' },
        // Label
        text: { $ref: '#/definitions/prop:text' },
        color: { $ref: '#/definitions/prop:color' },
        locked_color: { $ref: '#/definitions/prop:locked_color' },
        shadow: { $ref: '#/definitions/prop:shadow' },
        hide_hyphen: { $ref: '#/definitions/prop:hide_hyphen' },
        notify_on_ellipses: { $ref: '#/definitions/prop:notify_on_ellipses' },
        enable_profanity_filter: { $ref: '#/definitions/prop:enable_profanity_filter' },
        locked_alpha: { $ref: '#/definitions/prop:locked_alpha' },
        font_size: { $ref: '#/definitions/prop:font_size' },
        font_scale_factor: { $ref: '#/definitions/prop:font_scale_factor' },
        localize: { $ref: '#/definitions/prop:localize' },
        line_padding: { $ref: '#/definitions/prop:line_padding' },
        font_type: { $ref: '#/definitions/prop:font_type' },
        backup_font_type: { $ref: '#/definitions/prop:backup_font_type' },
        text_alignment: { $ref: '#/definitions/prop:text_alignment' },
        alignment: { $ref: '#/definitions/prop:alignment' },
        use_place_holder: { $ref: '#/definitions/prop:use_place_holder' },
        place_holder_text: { $ref: '#/definitions/prop:place_holder_text' },
        place_holder_text_color: { $ref: '#/definitions/prop:place_holder_text_color' },
        // TTS
        tts_name: { $ref: '#/definitions/prop:tts_name' },
        tts_control_header: { $ref: '#/definitions/prop:tts_control_header' },
        tts_section_header: { $ref: '#/definitions/prop:tts_section_header' },
        tts_control_type_order_priority: { $ref: '#/definitions/prop:tts_control_type_order_priority' },
        tts_index_priority: { $ref: '#/definitions/prop:tts_index_priority' },
        tts_toggle_on: { $ref: '#/definitions/prop:tts_toggle_on' },
        tts_toggle_off: { $ref: '#/definitions/prop:tts_toggle_off' },
        tts_override_control_value: { $ref: '#/definitions/prop:tts_override_control_value' },
        tts_inherit_siblings: { $ref: '#/definitions/prop:tts_inherit_siblings' },
        tts_value_changed: { $ref: '#/definitions/prop:tts_value_changed' },
        ttsSectionContainer: { $ref: '#/definitions/prop:ttsSectionContainer' },
        tts_ignore_count: { $ref: '#/definitions/prop:tts_ignore_count' },
        tts_skip_message: { $ref: '#/definitions/prop:tts_skip_message' },
        tts_skip_children: { $ref: '#/definitions/prop:tts_skip_children' },
        tts_value_order_priority: { $ref: '#/definitions/prop:tts_value_order_priority' },
        tts_play_on_unchanged_focus_control: { $ref: '#/definitions/prop:tts_play_on_unchanged_focus_control' },
        tts_ignore_subsections: { $ref: '#/definitions/prop:tts_ignore_subsections' },
        text_tts: { $ref: '#/definitions/prop:text_tts' },
        use_priority: { $ref: '#/definitions/prop:use_priority' },
        priority: { $ref: '#/definitions/prop:priority' },
        // Sprite
        texture: { $ref: '#/definitions/prop:texture' },
        allow_debug_missing_texture: { $ref: '#/definitions/prop:allow_debug_missing_texture' },
        uv: { $ref: '#/definitions/prop:uv' },
        uv_size: { $ref: '#/definitions/prop:uv_size' },
        texture_file_system: { $ref: '#/definitions/prop:texture_file_system' },
        nineslice_size: { $ref: '#/definitions/prop:nineslice_size' },
        tiled: { $ref: '#/definitions/prop:tiled' },
        tiled_scale: { $ref: '#/definitions/prop:tiled_scale' },
        clip_direction: { $ref: '#/definitions/prop:clip_direction' },
        clip_ratio: { $ref: '#/definitions/prop:clip_ratio' },
        clip_pixelperfect: { $ref: '#/definitions/prop:clip_pixelperfect' },
        pixel_perfect: { $ref: '#/definitions/prop:pixel_perfect' },
        keep_ratio: { $ref: '#/definitions/prop:keep_ratio' },
        bilinear: { $ref: '#/definitions/prop:bilinear' },
        fill: { $ref: '#/definitions/prop:fill' },
        $fit_to_width: { $ref: '#/definitions/prop:fit_to_width' },
        zip_folder: { $ref: '#/definitions/prop:zip_folder' },
        grayscale: { $ref: '#/definitions/prop:grayscale' },
        force_texture_reload: { $ref: '#/definitions/prop:force_texture_reload' },
        base_size: { $ref: '#/definitions/prop:base_size' },
        // Sound
        sound_name: { $ref: '#/definitions/prop:sound_name' },
        sound_volume: { $ref: '#/definitions/prop:sound_volume' },
        sound_pitch: { $ref: '#/definitions/prop:sound_pitch' },
        sounds: { $ref: '#/definitions/prop:sounds' },
        // Button
        default_control: { $ref: '#/definitions/prop:default_control' },
        hover_control: { $ref: '#/definitions/prop:hover_control' },
        pressed_control: { $ref: '#/definitions/prop:pressed_control' },
        locked_control: { $ref: '#/definitions/prop:locked_control' },
        // Selection Wheel
        inner_radius: { $ref: '#/definitions/prop:inner_radius' },
        outer_radius: { $ref: '#/definitions/prop:outer_radius' },
        state_controls: { $ref: '#/definitions/prop:state_controls' },
        slice_count: { $ref: '#/definitions/prop:slice_count' },
        button_name: { $ref: '#/definitions/prop:button_name' },
        iterate_left_button_name: { $ref: '#/definitions/prop:iterate_left_button_name' },
        iterate_right_button_name: { $ref: '#/definitions/prop:iterate_right_button_name' },
        initial_button_slice: { $ref: '#/definitions/prop:initial_button_slice' },
        // Dropdown
        dropdown_name: { $ref: '#/definitions/prop:dropdown_name' },
        dropdown_content_control: { $ref: '#/definitions/prop:dropdown_content_control' },
        dropdown_area: { $ref: '#/definitions/prop:dropdown_area' },
        // Toggle
        radio_toggle_group: { $ref: '#/definitions/prop:radio_toggle_group' },
        toggle_name: { $ref: '#/definitions/prop:toggle_name' },
        toggle_default_state: { $ref: '#/definitions/prop:toggle_default_state' },
        toggle_group_forced_index: { $ref: '#/definitions/prop:toggle_group_forced_index' },
        toggle_group_default_selected: { $ref: '#/definitions/prop:toggle_group_default_selected' },
        reset_on_focus_lost: { $ref: '#/definitions/prop:reset_on_focus_lost' },
        toggle_on_hover: { $ref: '#/definitions/prop:toggle_on_hover' },
        toggle_on_button: { $ref: '#/definitions/prop:toggle_on_button' },
        toggle_off_button: { $ref: '#/definitions/prop:toggle_off_button' },
        enable_directional_toggling: { $ref: '#/definitions/prop:enable_directional_toggling' },
        toggle_grid_collection_name: { $ref: '#/definitions/prop:toggle_grid_collection_name' },
        checked_control: { $ref: '#/definitions/prop:checked_control' },
        unchecked_control: { $ref: '#/definitions/prop:unchecked_control' },
        checked_hover_control: { $ref: '#/definitions/prop:checked_hover_control' },
        unchecked_hover_control: { $ref: '#/definitions/prop:unchecked_hover_control' },
        checked_locked_control: { $ref: '#/definitions/prop:checked_locked_control' },
        unchecked_locked_control: { $ref: '#/definitions/prop:unchecked_locked_control' },
        checked_locked_hover_control: { $ref: '#/definitions/prop:checked_locked_hover_control' },
        unchecked_locked_hover_control: { $ref: '#/definitions/prop:unchecked_locked_hover_control' },
        // Slider
        slider_track_button: { $ref: '#/definitions/prop:slider_track_button' },
        slider_small_decrease_button: { $ref: '#/definitions/prop:slider_small_decrease_button' },
        slider_small_increase_button: { $ref: '#/definitions/prop:slider_small_increase_button' },
        slider_steps: { $ref: '#/definitions/prop:slider_steps' },
        slider_direction: { $ref: '#/definitions/prop:slider_direction' },
        slider_timeout: { $ref: '#/definitions/prop:slider_timeout' },
        slider_collection_name: { $ref: '#/definitions/prop:slider_collection_name' },
        slider_name: { $ref: '#/definitions/prop:slider_name' },
        slider_select_on_hover: { $ref: '#/definitions/prop:slider_select_on_hover' },
        slider_selected_button: { $ref: '#/definitions/prop:slider_selected_button' },
        slider_deselected_button: { $ref: '#/definitions/prop:slider_deselected_button' },
        slider_box_control: { $ref: '#/definitions/prop:slider_box_control' },
        background_control: { $ref: '#/definitions/prop:background_control' },
        background_hover_control: { $ref: '#/definitions/prop:background_hover_control' },
        progress_control: { $ref: '#/definitions/prop:progress_control' },
        progress_hover_control: { $ref: '#/definitions/prop:progress_hover_control' },
        slider_render_bar_background_color: { $ref: '#/definitions/prop:slider_render_bar_background_color' },
        slider_render_bar_progress_color: { $ref: '#/definitions/prop:slider_render_bar_progress_color' },
        slider_render_bar_outline_color: { $ref: '#/definitions/prop:slider_render_bar_outline_color' },
        slider_render_bar_background_hover_color: { $ref: '#/definitions/prop:slider_render_bar_background_hover_color' },
        slider_render_bar_progress_hover_color: { $ref: '#/definitions/prop:slider_render_bar_progress_hover_color' },
        slider_render_bar_outline_hover_color: { $ref: '#/definitions/prop:slider_render_bar_outline_hover_color' },
        // Slider Box
        indent_control: { $ref: '#/definitions/prop:indent_control' },
        // Grid Page Indicator
        grid_item_when_current: { $ref: '#/definitions/prop:grid_item_when_current' },
        grid_item_when_not_current: { $ref: '#/definitions/prop:grid_item_when_not_current' },
        cycler_manager_size_control_target: { $ref: '#/definitions/prop:cycler_manager_size_control_target' },
        // Tab (Legacy)
        tab_index: { $ref: '#/definitions/prop:tab_index' },
        tab_control: { $ref: '#/definitions/prop:tab_control' },
        tab_content: { $ref: '#/definitions/prop:tab_content' },
        // Carousel Label (Legacy/Dev)
        always_rotate: { $ref: '#/definitions/prop:always_rotate' },
        rotate_speed: { $ref: '#/definitions/prop:rotate_speed' },
        hover_color: { $ref: '#/definitions/prop:hover_color' },
        hover_alpha: { $ref: '#/definitions/prop:hover_alpha' },
        pressed_color: { $ref: '#/definitions/prop:pressed_color' },
        pressed_alpha: { $ref: '#/definitions/prop:pressed_alpha' },
        // Grid
        grid_dimensions: { $ref: '#/definitions/prop:grid_dimensions' },
        maximum_grid_items: { $ref: '#/definitions/prop:maximum_grid_items' },
        grid_dimension_binding: { $ref: '#/definitions/prop:grid_dimension_binding' },
        grid_rescaling_type: { $ref: '#/definitions/prop:grid_rescaling_type' },
        grid_fill_direction: { $ref: '#/definitions/prop:grid_fill_direction' },
        precached_grid_item_count: { $ref: '#/definitions/prop:precached_grid_item_count' },
        grid_item_template: { $ref: '#/definitions/prop:grid_item_template' },
        // Grid Item
        grid_position: { $ref: '#/definitions/prop:grid_position' },
        // Edit Box
        text_box_name: { $ref: '#/definitions/prop:text_box_name' },
        text_edit_box_grid_collection_name: { $ref: '#/definitions/prop:text_edit_box_grid_collection_name' },
        constrain_to_rect: { $ref: '#/definitions/prop:constrain_to_rect' },
        enabled_newline: { $ref: '#/definitions/prop:enabled_newline' },
        text_type: { $ref: '#/definitions/prop:text_type' },
        max_length: { $ref: '#/definitions/prop:max_length' },
        text_control: { $ref: '#/definitions/prop:text_control' },
        place_holder_control: { $ref: '#/definitions/prop:place_holder_control' },
        can_be_deselected: { $ref: '#/definitions/prop:can_be_deselected' },
        always_listening: { $ref: '#/definitions/prop:always_listening' },
        virtual_keyboard_buffer_control: { $ref: '#/definitions/prop:virtual_keyboard_buffer_control' },
        // Scroll View
        scrollbar_track_button: { $ref: '#/definitions/prop:scrollbar_track_button' },
        scrollbar_touch_button: { $ref: '#/definitions/prop:scrollbar_touch_button' },
        scroll_speed: { $ref: '#/definitions/prop:scroll_speed' },
        gesture_control_enabled: { $ref: '#/definitions/prop:gesture_control_enabled' },
        always_handle_scrolling: { $ref: '#/definitions/prop:always_handle_scrolling' },
        touch_mode: { $ref: '#/definitions/prop:touch_mode' },
        scrollbar_box: { $ref: '#/definitions/prop:scrollbar_box' },
        scrollbar_track: { $ref: '#/definitions/prop:scrollbar_track' },
        scroll_view_port: { $ref: '#/definitions/prop:scroll_view_port' },
        scroll_content: { $ref: '#/definitions/prop:scroll_content' },
        scroll_box_and_track_panel: { $ref: '#/definitions/prop:scroll_box_and_track_panel' },
        jump_to_bottom_on_update: { $ref: '#/definitions/prop:jump_to_bottom_on_update' },
        allow_scroll_even_when_content_fits: { $ref: '#/definitions/prop:allow_scroll_even_when_content_fits' },
        // Factory
        factory: { $ref: '#/definitions/prop:factory' },
        control_name: { $ref: '#/definitions/prop:control_name' },
        control_ids: { $ref: '#/definitions/prop:control_ids' },
        // Data Binding
        bindings: { $ref: '#/definitions/prop:bindings' },
        // Collection
        collection_name: { $ref: '#/definitions/prop:collection_name' },
        collection_index: { $ref: '#/definitions/prop:collection_index' },
        // Focus
        default_focus_precedence: { $ref: '#/definitions/prop:default_focus_precedence' },
        focus_enabled: { $ref: '#/definitions/prop:focus_enabled' },
        focus_wrap_enabled: { $ref: '#/definitions/prop:focus_wrap_enabled' },
        focus_magnet_enabled: { $ref: '#/definitions/prop:focus_magnet_enabled' },
        focus_identifier: { $ref: '#/definitions/prop:focus_identifier' },
        focus_change_down: { $ref: '#/definitions/prop:focus_change_down' },
        focus_change_up: { $ref: '#/definitions/prop:focus_change_up' },
        focus_change_left: { $ref: '#/definitions/prop:focus_change_left' },
        focus_change_right: { $ref: '#/definitions/prop:focus_change_right' },
        focus_mapping: { $ref: '#/definitions/prop:focus_mapping' },
        focus_container: { $ref: '#/definitions/prop:focus_container' },
        use_last_focus: { $ref: '#/definitions/prop:use_last_focus' },
        focus_navigation_mode_left: { $ref: '#/definitions/prop:focus_navigation_mode_left' },
        focus_nagivation_mode_left: { $ref: '#/definitions/prop:focus_navigation_mode_left' },
        focus_navigation_mode_right: { $ref: '#/definitions/prop:focus_navigation_mode_right' },
        focus_nagivation_mode_right: { $ref: '#/definitions/prop:focus_navigation_mode_right' },
        focus_navigation_mode_down: { $ref: '#/definitions/prop:focus_navigation_mode_down' },
        focus_nagivation_mode_down: { $ref: '#/definitions/prop:focus_navigation_mode_down' },
        focus_navigation_mode_up: { $ref: '#/definitions/prop:focus_navigation_mode_up' },
        focus_nagivation_mode_up: { $ref: '#/definitions/prop:focus_navigation_mode_up' },
        focus_container_custom_left: { $ref: '#/definitions/prop:focus_container_custom_left' },
        focus_container_custom_right: { $ref: '#/definitions/prop:focus_container_custom_right' },
        focus_container_custom_down: { $ref: '#/definitions/prop:focus_container_custom_down' },
        focus_container_custom_up: { $ref: '#/definitions/prop:focus_container_custom_up' },
        // Input
        button_mappings: { $ref: '#/definitions/prop:button_mappings' },
        modal: { $ref: '#/definitions/prop:modal' },
        inline_modal: { $ref: '#/definitions/prop:inline_modal' },
        always_listen_to_input: { $ref: '#/definitions/prop:always_listen_to_input' },
        always_handle_pointer: { $ref: '#/definitions/prop:always_handle_pointer' },
        always_handle_controller_direction: { $ref: '#/definitions/prop:always_handle_controller_direction' },
        hover_enabled: { $ref: '#/definitions/prop:hover_enabled' },
        prevent_touch_input: { $ref: '#/definitions/prop:prevent_touch_input' },
        consume_event: { $ref: '#/definitions/prop:consume_event' },
        consume_hover_events: { $ref: '#/definitions/prop:consume_hover_events' },
        gesture_tracking_button: { $ref: '#/definitions/prop:gesture_tracking_button' },
        // Screen
        render_only_when_topmost: { $ref: '#/definitions/prop:render_only_when_topmost' },
        screen_not_flushable: { $ref: '#/definitions/prop:screen_not_flushable' },
        always_accepts_input: { $ref: '#/definitions/prop:always_accepts_input' },
        render_game_behind: { $ref: '#/definitions/prop:render_game_behind' },
        absorbs_input: { $ref: '#/definitions/prop:absorbs_input' },
        is_showing_menu: { $ref: '#/definitions/prop:is_showing_menu' },
        is_modal: { $ref: '#/definitions/prop:is_modal' },
        should_steal_mouse: { $ref: '#/definitions/prop:should_steal_mouse' },
        low_frequency_rendering: { $ref: '#/definitions/prop:low_frequency_rendering' },
        screen_draws_last: { $ref: '#/definitions/prop:screen_draws_last' },
        vr_mode: { $ref: '#/definitions/prop:vr_mode' },
        force_render_below: { $ref: '#/definitions/prop:force_render_below' },
        send_telemetry: { $ref: '#/definitions/prop:send_telemetry' },
        close_on_player_hurt: { $ref: '#/definitions/prop:close_on_player_hurt' },
        cache_screen: { $ref: '#/definitions/prop:cache_screen' },
        load_screen_immediately: { $ref: '#/definitions/prop:load_screen_immediately' },
        gamepad_cursor: { $ref: '#/definitions/prop:gamepad_cursor' },
        gamepad_cursor_deflection_mode: { $ref: '#/definitions/prop:gamepad_cursor_deflection_mode' },
        should_be_skipped_during_automation: { $ref: '#/definitions/prop:should_be_skipped_during_automation' },
        // Custom Renderer
        renderer: { $ref: '#/definitions/prop:renderer' },
        // Custom - Paper Doll Renderer
        camera_tilt_degrees: { $ref: '#/definitions/prop:camera_tilt_degrees' },
        starting_rotation: { $ref: '#/definitions/prop:starting_rotation' },
        use_selected_skin: { $ref: '#/definitions/prop:use_selected_skin' },
        use_uuid: { $ref: '#/definitions/prop:use_uuid' },
        use_skin_gui_scale: { $ref: '#/definitions/prop:use_skin_gui_scale' },
        'use_player_paperdoll ': { $ref: '#/definitions/prop:use_player_paperdoll' },
        rotation: { $ref: '#/definitions/prop:rotation' },
        modelsize: { $ref: '#/definitions/prop:modelsize' },
        animation_looped: { $ref: '#/definitions/prop:animation_looped' },
        animation: { $ref: '#/definitions/prop:animation' },
        // Custom - Netease Paper Doll Renderer
        screen_offset: { $ref: '#/definitions/prop:screen_offset' },
        screen_scale: { $ref: '#/definitions/prop:screen_scale' },
        mob_body_rot_y: { $ref: '#/definitions/prop:mob_body_rot_y' },
        mob_head_rot_y: { $ref: '#/definitions/prop:mob_head_rot_y' },
        init_rot_y: { $ref: '#/definitions/prop:init_rot_y' },
        skeleton_model_name: { $ref: '#/definitions/prop:skeleton_model_name' },
        entity_identifier: { $ref: '#/definitions/prop:entity_identifier' },
        // Custom - Netease MiniMap Renderer
        // "size_grade": { "$ref": "#/definitions/prop:size_grade" },
        use_default_face_icon: { $ref: '#/definitions/prop:use_default_face_icon' },
        face_icon_bg_color: { $ref: '#/definitions/prop:face_icon_bg_color' },
        enable_live_update: { $ref: '#/definitions/prop:enable_live_update' },
        live_update_interval: { $ref: '#/definitions/prop:live_update_interval' },
        highest_y: { $ref: '#/definitions/prop:highest_y' },
        // Custom - Progress Bar Renderer
        primary_color: { $ref: '#/definitions/prop:primary_color' },
        secondary_color: { $ref: '#/definitions/prop:secondary_color' },
        // Custom - Gradient Renderer
        gradient_direction: { $ref: '#/definitions/prop:gradient_direction' },
        color1: { $ref: '#/definitions/prop:color1' },
        color2: { $ref: '#/definitions/prop:color2' },
        // Custom - Name Tag Renderer
        text_color: { $ref: '#/definitions/prop:text_color' },
        background_color: { $ref: '#/definitions/prop:background_color' },
        // Custom - Hover Text Renderer
        hover_text_max_width: { $ref: '#/definitions/prop:hover_text_max_width' },
        // Debug Renderer
        debug: { $ref: '#/definitions/prop:debug' },
        // Cycler
        target_cycler_to_compare: { $ref: '#/definitions/prop:target_cycler_to_compare' },
        next_sub_page_button_name: { $ref: '#/definitions/prop:next_sub_page_button_name' },
        prev_sub_page_button_name: { $ref: '#/definitions/prop:prev_sub_page_button_name' },
        //// Label Cycler
        text_labels: { $ref: '#/definitions/prop:text_labels' },
        //// Image Cycler
        images: { $ref: '#/definitions/prop:images' }
      },
      patternProperties: {
        '\\$[a-zA-Z0-9_]+': {
          description: 'Variable',
          anyOf: [
            { type: 'boolean' },
            { type: 'number' },
            { type: 'string' },
            { type: 'object' },
            { type: 'array' },
            { type: 'null' },
            { $ref: '#/definitions/hc:collection_name' },
            { $ref: '#/definitions/hc:button_id' },
            { $ref: '#/definitions/vl:type' },
            { $ref: '#/definitions/hc:toggle_name' },
            { $ref: '#/definitions/hc:textbox_name' },
            { $ref: '#/definitions/vl:renderer' },
            { $ref: '#/definitions/hc:slider_name' },
            { $ref: '#/definitions/vl:anchor' },
            { $ref: '#/definitions/hc:binding' },
            { $ref: '#/definitions/vl:easing' },
            { $ref: '#/definitions/hc:bag_binding' },
            { $ref: '#/definitions/vl:binding_type' },
            { $ref: '#/definitions/vl:font_size' },
            { $ref: '#/definitions/hc:links' },
            { $ref: '#/definitions/vl:binding_condition' },
            { $ref: '#/definitions/vl:orientation' },
            { $ref: '#/definitions/vl:mc_color' },
            { $ref: '#/definitions/vl:global_variables' }
          ]
        }
      }
    },
    ui_control_with_type_required: {
      $ref: '#/definitions/ui_control',
      anyOf: [{ required: ['type', 'ignored'] }, { required: ['type'] }, { required: ['ignored'] }, { required: ['anim_type'] }]
    },
    'nm:type': {
      description: "Type of the UI element. It's required to have it otherwise it will throw an error.",
      oneOf: [{ $ref: '#/definitions/vl:type' }, { $ref: '#/definitions/vl:variable' }]
    },
    'nm:controls': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nChildren of the UI element.',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            patternProperties: {
              '^\\$?[a-zA-Z0-9:\\-_]+(@((\\$[a-zA-Z0-9:\\-_]+)|(([a-zA-Z0-9:\\-_]+\\.)?[a-zA-Z0-9:\\-_]+)))?$': {
                $ref: '#/definitions/ui_control'
              }
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'nm:variables': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nChanges variables values if conditions are met.',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              requires: {
                description: 'Required condition to this changes to happen.',
                type: 'string'
              }
            },
            required: ['requires']
          }
        },
        {
          type: 'object',
          properties: {
            requires: {
              description: 'Required condition to this changes to happen.',
              type: 'string'
            }
          },
          required: ['requires']
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'nm:modifications': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nAllows to modify the UI elements from resource packs below this one.',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              array_name: {
                oneOf: [
                  {
                    enum: ['controls', 'bindings', 'button_mappings']
                  },
                  { $ref: '#/definitions/vl:variable' }
                ]
              },
              control_name: {
                type: 'string'
              },
              where: {
                anyOf: [
                  {
                    type: 'object'
                  },
                  {
                    $ref: '#/definitions/vl:binding_item'
                  }
                ]
              },
              target: {
                type: 'object'
              },
              target_control: {
                type: 'string'
              },
              value: {
                oneOf: [
                  {
                    type: 'object'
                  },
                  {
                    type: 'array',
                    items: {
                      anyOf: [
                        {
                          type: 'object',
                          additionalProperties: false,
                          patternProperties: {
                            '^\\$?[a-zA-Z0-9:\\-_]+(@((\\$[a-zA-Z0-9:\\-_]+)|(([a-zA-Z0-9:\\-_]+\\.)?[a-zA-Z0-9:\\-_]+)))?$': {
                              $ref: '#/definitions/ui_control'
                            }
                          }
                        },
                        { $ref: '#/definitions/vl:binding_item' }
                      ]
                    }
                  }
                ]
              },
              operation: {
                oneOf: [
                  {
                    enum: ['insert_back', 'insert_front', 'insert_after', 'insert_before', 'move_back', 'move_front', 'move_after', 'move_before', 'swap', 'remove', 'replace']
                  },
                  { $ref: '#/definitions/vl:variable' }
                ]
              }
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'nm:ignored': {
      markdownDescription: "**Type**: ```Any```\t\n\t\nIf the UI element is ignored during parsing. It won't be used at all.\t\n\t\n**Default**: ```false```",
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Animations
    'prop:anims': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nAnimations for this element.\t\n[__namespace.element__]',
      default: [],
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'string',
            pattern: '^@[a-zA-Z0-9_]+\\.[a-zA-Z0.9_]+$'
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:disable_anim_fast_forward': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.1```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:animation_reset_name': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.3/1.4```'
    },
    // Animations Element (Independent of the UI elements)
    'anim_prop:anim_type': {
      oneOf: [{ $ref: '#/definitions/vl:anim_type' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:duration': {
      markdownDescription: '**Anim Type**: ```Any (!Flipbook)```',
      type: ['number', 'string']
    },
    'anim_prop:next': {
      markdownDescription: '**Anim Type**: ```Any (!Flipbook)```\t\n\t\nWhat animation to play next following this current one.',
      type: 'string'
    },
    'anim_prop:destroy_at_end': {
      markdownDescription: '**Anim Type**: ```Any (!Flipbook)```\t\n\t\nThe name of control element that will be destroyed when the animation ends.',
      type: 'string'
    },
    'anim_prop:play_event': {
      markdownDescription: '**Anim Type**: ```Any```\t\n\t\nEvent that triggers this animation to start.',
      type: 'string'
    },
    'anim_prop:end_event': {
      markdownDescription: '**Anim Type**: ```Any```',
      type: 'string'
    },
    'anim_prop:start_event': {
      markdownDescription: '**Anim Type**: ```Any```',
      type: 'string'
    },
    'anim_prop:reset_event': {
      markdownDescription: '**Anim Type**: ```Any```',
      type: 'string'
    },
    'anim_prop:easing': {
      oneOf: [{ $ref: '#/definitions/vl:easing' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:from': {
      markdownDescription: '**Anim Type**: ```Any (!Flipbook)```',
      oneOf: [{ type: 'number' }, { type: 'string' }, { $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:size' }]
    },
    'anim_prop:to': {
      markdownDescription: '**Anim Type**: ```Any (!Flipbook)```',
      oneOf: [{ type: 'number' }, { type: 'string' }, { $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:size' }]
    },
    'anim_prop:initial_uv': {
      markdownDescription: '**Anim Type**: ```Flipbook```',
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'number'
          },
          default: [0, 0]
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'anim_prop:fps': {
      markdownDescription: '**Anim Type**: ```Flipbook```',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:frame_count': {
      markdownDescription: '**Anim Type**: ```Flipbook```\t\n\t\nThe amount of frames the animation has.',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:frame_step': {
      markdownDescription: '**Anim Type**: ```Flipbook```\t\n\t\nHow many pixels to advance to get to the next frame.',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:reversible': {
      markdownDescription: '**Anim Type**: ```Flipbook```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:resettable': {
      markdownDescription: '**Anim Type**: ```Any```\t\n\t\n**Version**: ```+1.3/1.4```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:scale_from_starting_alpha': {
      markdownDescription: '**Anim Type**: ```Alpha```\t\n\t\n**Version**: ```+1.3/1.4```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'anim_prop:activated': {
      type: 'string',
      markdownDescription: '**Anim Type**: ```Any```\t\n\t\n**Version**: ```+?```'
    },
    // Control
    'prop:visible': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nIf the UI element should be visible.\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:enabled': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nIf true and if the UI element or any of its children have the locked state then they will be in the locked.\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:layer': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nZ-Index/Layer relative to parent element. Higher layers will render above.\t\n\t\n**Default**: ```0```',
      default: 0,
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:z_order': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nZ-Index relative to parent element. Higher layers will render above. Replaced with ```layer```.\t\n\t\n**Default**: ```0```\t\n\t\n**Version**: ```0.12 only```',
      default: 0,
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:alpha': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nAlpha/transparency of the element. It will only affect the parent UI element. Its children will be unaffected. If you want the alpha to apply for both the parent and children use ```propagate_alpha```.\t\n\t\n**Default**: ```1.0```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0
        },
        { $ref: '#/definitions/vl:animation' },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:propagate_alpha': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nIf ```alpha``` should not only apply to the parent if possible but also all its children.\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.1```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:clips_children': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nCuts off everything beyond the bounderies of the UI element.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:allow_clipping': {
      markdownDescription: "**Type**: ```Any```\t\n\t\nIf ```clips_children``` works in the UI element. Otherwise, it won't have any effect.\t\n\t\n**Default**: ```true```",
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:clip_offset': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nOffset from the start of the clipping.\t\n\t\n**Default**: ```[0, 0]```\t\n\t\n**Version**: ```? - ?```',
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'number'
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:clip_state_change_event': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.3/1.4```'
    },
    'prop:enable_scissor_test': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:property_bag': {
      $comment: 'TODO: Add props',
      markdownDescription: '**Type**: ```Any```\t\n\t\nProperty bag contains properties that are more related with the data than the actually structure of the UI element.',
      oneOf: [
        {
          type: 'object',
          additionalProperties: true,
          properties: {
            // Live Horse Renderer
            '#entity_id': {
              type: 'string'
            },
            // Paper Doll Renderer
            entity_type: {
              enum: ['player', 'npc']
            },
            '#skin_idx': {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#player_uuid': {
              type: 'string'
            },
            '#skin_rotation': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#custom_rot_y': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#gesture_delta_source': {
              type: 'string'
            },
            '#gesture_mouse_delta_x': {
              type: 'string'
            },
            '#pack_id': {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#force_skin_update': {
              type: 'string'
            },
            // Progress Bar Renderer
            '#progress_bar_visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#progress_bar_total_amount': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#progress_bar_current_amount': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            is_durability: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            round_value: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            drop_shadow: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            round_up: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            is_storage_bar: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            // Hover Text Renderer
            '#hover_text': {
              type: 'string'
            },
            // Enchanting Book Renderer
            '#open': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            // Flying Item Renderer
            flying_item_count: {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_id_aux: {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_custom_color: {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_origin_position_x: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_origin_position_y: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_origin_scale: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_destination_position_x: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_destination_position_y: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_destination_scale: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            flying_item_banner_patterns: {
              type: 'string'
            },
            flying_item_banner_colors: {
              type: 'string'
            },
            //
            skin_pack_collection_name: {
              type: 'string'
            },
            timer_duration: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#should_host': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            is_local: {
              description: 'Version: +1.14',
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#is_left': {
              description: 'Version: +1.13',
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#is_skins': {
              description: 'Version: +1.13',
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#image_name': {
              description: 'Version: +1.13',
              type: 'string'
            },
            '#is_dropdown': {
              description: 'Version: +1.11',
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#timer_field_count_to_show': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#owned_incompatible_prompt_color': {
              $ref: '#/definitions/vl:color'
            },
            name: {
              type: 'string'
            },
            '#modal_title_text': {
              // CHECK LATER
              type: 'string'
            },
            '#modal_label_text': {
              type: 'string'
            },
            '#buttons_visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#no_buttons_visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#single_button_visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#two_buttons_visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            reset_group: {
              description: '...\nVersion: +1.2',
              oneOf: [
                {
                  enum: [
                    'video',
                    'audio',
                    // +1.11
                    'accessibility'
                  ]
                }
              ]
            },
            '#text': {
              type: 'string'
            },
            is_fixed_inventory: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            experimental_radio_button_state: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            classic_radio_button_state: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#slider_steps': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#slider_value': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#collection_prefix': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#visible': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#anchored_offset_value': {
              description: 'Legacy',
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#anchored_offset_value_x': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#anchored_offset_value_y': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#size_binding_x': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#size_binding_y': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#is_featured': {
              type: ['boolean', 'string']
            },
            '#disabled_filter_visible': {
              type: ['boolean', 'string']
            },
            '#common': {
              oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#uncommon': {
              oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#rare': {
              oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#epic': {
              oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#legendary': {
              oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#max_upsell_offers': {
              type: 'integer'
            },
            '#default_prompt_color': {
              type: 'string'
            },
            '#coin_prompt_color': {
              type: 'string'
            },
            control_id: {
              type: 'string'
            },
            '#visible_after_x_ratings': {
              type: ['boolean', 'string']
            },
            '#empty_star_texture': {
              type: 'string'
            },
            '#filled_star_texture': {
              type: 'string'
            },
            '#look_at_cursor': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#use_heart_offset': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#hyperlink': {
              oneOf: [{ $ref: '#/definitions/hc:links' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#flying_item_renderer': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#item_id_aux': {
              type: 'integer'
            },
            '#collection_name': {
              type: 'string'
            },
            '#index': {
              type: ['integer', 'string']
            },
            '#collection_index': {
              type: 'integer'
            },
            '#property_field': {
              type: 'string'
            },
            '#hover_slice': {
              type: 'integer'
            },
            '#start_selected': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#filtered_light_multiplier': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#tts_dialog_title': {
              description: 'Version: +1.11',
              type: 'string'
            },
            '#tts_dialog_body': {
              description: 'Version: +1.11',
              type: 'string'
            },
            force_update: {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            opacity_override: {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#playername': {
              type: 'string'
            },
            '#x_padding': {
              oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#sub_command': {
              type: 'string'
            },
            '#has_focus': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#banner_patterns': {
              type: 'string'
            },
            '#banner_colors': {
              type: 'string'
            },
            '#item_custom_color': {
              type: 'number'
            },
            '#item_pickup_time': {
              type: 'number'
            },
            '#block_position': {
              type: 'array',
              items: {
                type: 'number'
              }
            },
            '#panel_title': {
              type: 'string'
            },
            '#toggle_state': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#bottom_left_block': {
              oneOf: [
                {
                  type: 'array',
                  items: {
                    type: 'number'
                  }
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            },
            '#top_right_block': {
              oneOf: [
                {
                  type: 'array',
                  items: {
                    type: 'number'
                  }
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            },
            '#include_entities': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#remove_blocks': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#include_players': {
              oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
            },
            '#button_navigation': {
              oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:selected': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\nIf the text box is selected by default.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_child_anchors': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nUse the anchor_from/anchor_to of the child of the UI element.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:anchor_from': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nAnchor in the parent element.\t\n\t\n**Default**: ```center```',
      oneOf: [{ $ref: '#/definitions/vl:anchor' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:anchor_to': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nAnchor in this element.\t\n\t\n**Default**: ```center```',
      oneOf: [{ $ref: '#/definitions/vl:anchor' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:contained': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:draggable': {
      markdownDescription: '**Type**: ```Any```',
      oneOf: [{ enum: ['vertical', 'horizontal', 'not_draggable', 'both'] }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:follows_cursor': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nFollows the mouse or touch.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:offset': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nPosition of the UI element relative to the parent UI element. __[x, y]__\t\n\t\n ___px___ - *Pixels*\t\n\t\n ___%___ - *Width/height of parent UI element*\t\n\t\n ___%x___ - *Width of the UI element*\t\n\t\n ___%y___ - *Height of the UI element*\t\n\t\n**Default**: ```[0, 0]```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:offset' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:size': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nSize of the UI element. __[width, height]__\t\n\t\n ___px___ - *Pixels*\t\n\t\n ___%___ - *Width/height of parent UI element*\t\n\t\n ___%c___ - *Width/height of children*\t\n\t\n ___%cm___ - *Width/height of the largest child UI element*\t\n\t\n ___%sm___ - *Width/height of sibling UI element*\t\n\t\n ___%x___ - *Width of the UI element*\t\n\t\n ___%y___ - *Height of the UI element*\t\n\t\n**Default**: ```[default, default]```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:size' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:max_size': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nMaximum size of the UI element. __[width, height]__\t\n\t\n ___px___ - *Pixels*\t\n\t\n ___%___ - *Width/height of parent UI element*\t\n\t\n ___%c___ - *Width/height of children*\t\n\t\n ___%cm___ - *Width/height of the largest child UI element*\t\n\t\n ___%sm___ - *Width/height of sibling UI element*\t\n\t\n ___%x___ - *Width of the UI element*\t\n\t\n ___%y___ - *Height of the UI element*\t\n\t\n**Default**: ```[default, default]```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:size' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:min_size': {
      markdownDescription:
        '**Type**: ```Any```\t\n\t\nMinimum size of the UI element. __[width, height]__\t\n\t\n ___px___ - *Pixels*\t\n\t\n ___%___ - *Width/height of parent UI element*\t\n\t\n ___%c___ - *Width/height of children*\t\n\t\n ___%cm___ - *Width/height of the largest child UI element*\t\n\t\n ___%sm___ - *Width/height of sibling UI element*\t\n\t\n ___%x___ - *Width of the UI element*\t\n\t\n ___%y___ - *Height of the UI element*\t\n\t\n**Default**: ```[default, default]```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:size' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:inherit_max_sibling_width': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.3/1.4```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:inherit_max_sibling_height': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.3/1.4```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_anchored_offset': {
      'prop:inherit_max_sibling_height': {
        markdownDescription: '**Type**: ```Any```\t\n\t\n**Default**: ```false```',
        default: false,
        oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
      }
    },
    // Stack Panel
    'prop:orientation': {
      markdownDescription: '**Type**: ```Stack Panel```\t\n\t\nDirection the items stack inside ```stack_panel```.\t\n\t\n**Requires**: ```**type**: stack_panel```\t\n**Default**: ```vertical```',
      oneOf: [{ $ref: '#/definitions/vl:orientation' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Text
    'prop:text': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nText content.',
      type: 'string'
    },
    'prop:color': {
      markdownDescription: '**Type**: ```Label | Image```\t\n\t\nText color. __[r, g, b] (0 <= v <= 1)__\t\n\t\n**Default**: ```white```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:mc_color' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:locked_color': {
      markdownDescription: '**Type**: ```Label | Image```\t\n\t\nText color when a parent has ```enabled: false```. __[r, g, b] (0 <= v <= 1)__\t\n\t\n**Default**: ```white```',
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:shadow': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nShadow of the text.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:hide_hyphen': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nHide hyphen caused by word breaking.\t\n\t\n**Default**: ```false```\t\n**Version**: ```+1.2```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:notify_on_ellipses': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nArray of names of the UI elements to notify when text gets or loses ellipses.\t\n\t\n**Version**: ```+1.3/1.4```',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:enable_profanity_filter': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nCensore words included in the profanity_filter.wlist file.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:locked_alpha': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nAlpha/transparency of label when a parent has ```enabled: false```.\t\n\t\n**Default**: ```1.0```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0
        },
        { $ref: '#/definitions/vl:animation' },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:font_size': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nSize of the text.\t\n\t\n**Default**: ```normal```',
      oneOf: [{ $ref: '#/definitions/vl:font_size' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:font_scale_factor': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nScale of the text.\t\n\t\n**Default**: ```1.0```\t\n**Version**: ```+1.2```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:localize': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nIf ```text``` should be translated.\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:line_padding': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nSpace between lines.\t\n\t\n**Version**: ```+1.2```',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:font_type': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nFont of the text.\t\n\t\n**Default**: ```default```',
      anyOf: [{ $ref: '#/definitions/vl:font_type' }, { type: 'string' }]
    },
    'prop:backup_font_type': {
      markdownDescription: "**Type**: ```Label```\t\n\t\nFont used if ```font_type``` didn't work.\t\n\t\n**Default**: ```default```",
      oneOf: [{ $ref: '#/definitions/vl:font_type' }, { type: 'string' }]
    },
    'prop:text_alignment': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nText alignment direction when the text element is bigger than the text content itself.\t\n\t\n**Version**: ```+1.1```',
      oneOf: [{ $ref: '#/definitions/vl:text_alignment' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:alignment': {
      markdownDescription: '**Type**: ```Label```\t\n\t\nText alignment direction when the text element is bigger than the text content itself.\t\n\t\n**Version**: ```? - ?```',
      oneOf: [{ $ref: '#/definitions/vl:text_alignment' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_place_holder': {
      markdownDescription: '**Type**: ```Label```\t\n\t\n**Version**: ```0.16 Only```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:place_holder_text': {
      markdownDescription: '**Type**: ```Label```\t\n\t\n**Version**: ```0.16 Only```',
      type: 'string'
    },
    'prop:place_holder_text_color': {
      markdownDescription: '**Type**: ```Label```\t\n\t\n**Version**: ```0.16 Only```',
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:animation' }, { $ref: '#/definitions/vl:variable' }]
    },
    // TTS
    'prop:tts_name': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\nMain text for text to speech.\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_control_header': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\nText for text to speech.\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_section_header': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\nText to speech for the tts section.\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_control_type_order_priority': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.11```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_index_priority': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nElement text to speech priority.\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_toggle_on': {
      type: 'string',
      markdownDescription: '**Type**: ```Toggle```\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_toggle_off': {
      type: 'string',
      markdownDescription: '**Type**: ```Toggle```\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_override_control_value': {
      type: 'string',
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:tts_inherit_siblings': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nElement has siblings that use text to speech and inherits their tts.\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.11```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_value_changed': {
      type: 'string',
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```+1.11```'
    },
    'prop:ttsSectionContainer': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nThe content belongs to a certain tts.\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_ignore_count': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nIgnore how many elements are in queue for tts.\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_skip_message': {
      markdownDescription: "**Type**: Any\t\n\t\nDoesn't allow text to speech and skip it.\t\n\t\nDefault: false\t\nVersion: +1.15/1.16",
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_skip_children': {
      markdownDescription: '**Type**: Any\t\n\t\nDefault: false\t\nVersion: +1.19',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_value_order_priority': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.11```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_play_on_unchanged_focus_control': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tts_ignore_subsections': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:text_tts': {
      type: 'string',
      markdownDescription: '**Type**: ```Label```\t\n\t\nText content for text to speech.\t\n\t\n**Version**: ```+1.15/1.16```'
    },
    'prop:use_priority': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.13```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:priority': {
      markdownDescription: '**Type**: ```Any```\t\n\t\n**Version**: ```+1.13```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Sprite
    'prop:texture': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nImage path starting from pack root.',
      type: 'string',
      pattern: '^(#[a-zA-Z0-9_]+|\\$[:a-zA-Z0-9_-]+|[:a-zA-Z0-9_-]*((\\\\|\\/)[:a-zA-Z0-9_-]*){0,}(.(png|jpe?g))?)$',
      default: ''
    },
    'prop:allow_debug_missing_texture': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nDisplay the missing_texture if the texture is not found.\t\n\t\n**Default**: ```true```\t\n\t\n**Version**: ```+1.11```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:uv': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nStart position of the texture mapping. __[u, v]__',
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'number'
          }
        },
        { $ref: '#/definitions/vl:animation' },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:uv_size': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nSize of the texture mapping. __[width, height]__',
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'number'
          }
        },
        { $ref: '#/definitions/vl:animation' },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:texture_file_system': {
      markdownDescription: '**Type**: ```Image```',
      type: 'string',
      examples: ['RawPath', 'InAppPackage']
    },
    'prop:nineslice_size': {
      markdownDescription:
        '**Type**: ```Image```\t\n\t\n9-slice. __[x1, y1, x2, y2]__ __[x1/x2, y1/y2]__ or just a number for all of them. An explanation of ninepath: [https://wiresareobsolete.com/2010/06/9-patches/](https://wiresareobsolete.com/2010/06/9-patches/).',
      oneOf: [
        { type: 'number' },
        {
          type: 'array',
          minItems: 2,
          maxItems: 4,
          items: {
            type: 'number'
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:tiled': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nIf the texture will tile when the size of the UI element is bigger than the texture size.\t\n\t\n**Default**: ```false```',
      default: true,
      oneOf: [{ type: 'boolean' }, { enum: ['x', 'y', 'xy', 'yx'] }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tiled_scale': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nScale of the texture tiling.\t\n\t\n**Default**: ```1.0```\t\n\t\n**Version**: ```+1.0```',
      default: [],
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'number',
            minimum: 0.0
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:clip_direction': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nStart point position for the ```clip_ratio```. If ```down```, the image will begin to appear from the bottom.',
      oneOf: [{ $ref: '#/definitions/vl:clip_direction' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:clip_ratio': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nHow much to clip. From 0.0 to 1.0.\t\n\t\n**Version**: ```+1.2```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:clip_pixelperfect': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nIf the clip should try to be most pixel accurate possible.\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:pixel_perfect': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nAlias for ```clip_pixelperfect```.\t\n\t\n**Default**: ```true```\t\n\t\n**Version**: ```1.8 only```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:keep_ratio': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nKeep ratio when resizing image.\t\n\t\n**Version**: ```+1.12```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:bilinear': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nUse the bilinear function when resizing the image.\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.5```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:fill': {
      markdownDescription: '**Type**: ```Image```\t\n\t\n**Version**: ```+1.2```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:fit_to_width': {
      markdownDescription: '**Type**: ```Image```\t\n\t\n**Version**: ```? - ?```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:zip_folder': {
      markdownDescription: '**Type**: ```Image```',
      type: 'string'
    },
    'prop:grayscale': {
      markdownDescription: '**Type**: ```Image```\t\n\t\nRender image in black and white.\t\n\t\n**Default**: ```false```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:force_texture_reload': {
      markdownDescription: '**Type**: ```Image```\t\n\t\n**Version**: ```+1.2```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:base_size': {
      markdownDescription: '**Type**: ```Image```',
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'number',
            minimum: 0
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    // Sound
    'prop:sound_name': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nName of the sound event to be played.',
      type: 'string'
    },
    'prop:sound_volume': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nVolume of the sound event to be played.',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:sound_pitch': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nPitch of the sound event to be played.',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:sounds': {
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              sound_name: {
                markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nName of the sound event to be played.',
                type: 'string'
              },
              sound_volume: {
                markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nVolume of the sound event to be played.',
                default: 1.0,
                oneOf: [
                  {
                    type: 'number',
                    minimum: 0
                  },
                  { $ref: '#/definitions/vl:variable' }
                ]
              },
              sound_pitch: {
                markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Input Panel | Selection Wheel | Screen```\t\n\t\nPitch of the sound event to be played.',
                default: 1.0,
                oneOf: [
                  {
                    type: 'number',
                    minimum: 0
                  },
                  { $ref: '#/definitions/vl:variable' }
                ]
              },
              min_seconds_between_plays: {
                oneOf: [
                  {
                    type: 'number',
                    minimum: 0
                  },
                  { $ref: '#/definitions/vl:variable' }
                ]
              },
              event_type: {
                type: 'string'
              },
              button_name: {
                type: 'string'
              }
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    // Button
    'prop:default_control': {
      markdownDescription: '**Type**: ```Button | Slider Box | Slider | Edit Box```\t\n\t\nName of the child control to show only in the default state.',
      type: 'string',
      examples: ['default']
    },
    'prop:hover_control': {
      markdownDescription: '**Type**: ```Button | Slider Box | Slider | Edit Box```\t\n\t\nName of the child control to show only in the hover state.',
      type: 'string',
      examples: ['hover']
    },
    'prop:pressed_control': {
      markdownDescription: '**Type**: ```Button | Edit Box```\t\n\t\nName of the child control to show only in the pressed state.',
      type: 'string',
      examples: ['pressed']
    },
    'prop:locked_control': {
      markdownDescription: '**Type**: ```Button | Slider Box | Edit Box```\t\n\t\nName of the child control to show only in the locked/disabled state.',
      type: 'string',
      examples: ['locked']
    },
    // Selection Wheel
    'prop:inner_radius': {
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:outer_radius': {
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:state_controls': {
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:slice_count': {
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:button_name': {
      type: 'string',
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```'
    },
    'prop:iterate_left_button_name': {
      type: 'string',
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```'
    },
    'prop:iterate_right_button_name': {
      type: 'string',
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```'
    },
    'prop:initial_button_slice': {
      markdownDescription: '**Type**: ```Selection Wheel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Dropdown
    'prop:dropdown_name': {
      markdownDescription: '**Type**: ```Dropdown```',
      type: 'string'
    },
    'prop:dropdown_content_control': {
      markdownDescription: '**Type**: ```Dropdown```',
      type: 'string'
    },
    'prop:dropdown_area': {
      markdownDescription: '**Type**: ```Dropdown```',
      type: 'string'
    },
    // Toggle
    'prop:radio_toggle_group': {
      markdownDescription:
        '**Type**: ```Toggle | Dropdown```\t\n\t\nIf toggle belongs to a group. Each toggle of the group must have a different ```toggle_group_forced_index```.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:toggle_name': {
      markdownDescription: '**Type**: ```Toggle```\t\n\t\nName of the toggle group that this toggle belongs to.',
      type: 'string',
      default: ''
    },
    'prop:toggle_default_state': {
      markdownDescription: '**Type**: ```Toggle```\t\n\t\nIf the toggle is the one active from a group by default.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:toggle_group_forced_index': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:toggle_group_default_selected': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:reset_on_focus_lost': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\n**Version**: ```+1.13```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:toggle_on_hover': {
      markdownDescription: '**Type**: ```Toggle```\t\n\t\n**Version**: ```+1.2```',
      type: 'string',
      default: 'toggle.toggle_on'
    },
    'prop:toggle_on_button': {
      markdownDescription: '**Type**: ```Toggle```\t\n\t\nID of the action for when the toggle is on.\t\n\t\n**Version**: ```+1.2```',
      type: 'string',
      default: 'toggle.toggle_on'
    },
    'prop:toggle_off_button': {
      markdownDescription: '**Type**: ```Toggle```\t\n\t\nID of the action for when the toggle is off.\t\n\t\n**Version**: ```+1.2```',
      type: 'string',
      default: 'toggle.toggle_off'
    },
    'prop:enable_directional_toggling': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:toggle_grid_collection_name': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the item collection to be used. It can be empty.',
      default: '',
      oneOf: [{ $ref: '#/definitions/hc:collection_name' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:checked_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __checked__ state.',
      type: 'string'
    },
    'prop:unchecked_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __unchecked__ state.',
      type: 'string'
    },
    'prop:checked_hover_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __checked_hover__ state.',
      type: 'string'
    },
    'prop:unchecked_hover_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __unchecked_hover__ state.',
      type: 'string'
    },
    'prop:checked_locked_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __checked_locked__ state.',
      type: 'string'
    },
    'prop:unchecked_locked_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __unchecked_locked__ state.',
      type: 'string'
    },
    'prop:checked_locked_hover_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __checked_locked_hover__ state.',
      type: 'string'
    },
    'prop:unchecked_locked_hover_control': {
      markdownDescription: '**Type**: ```Toggle | Dropdown```\t\n\t\nName of the control that will only show up when toggle is on the __unchecked_locked_hover__ state.',
      type: 'string'
    },
    // Slider
    'prop:slider_track_button': {
      markdownDescription: '**Type**: ```Slider```',
      type: 'string'
    },
    'prop:slider_small_decrease_button': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nID of the action for the decrease slider.\t\n\t\n**Version**: ```+1.2```',
      default: 'slider.small_decrease',
      oneOf: [{ $ref: '#/definitions/hc:button_id' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_small_increase_button': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nID of the action for the increase slider.\t\n\t\n**Version**: ```+1.2```',
      default: 'slider.small_decrease',
      oneOf: [{ $ref: '#/definitions/hc:button_id' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_steps': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nHow many steps (or values) does the slider have.',
      default: 0,
      oneOf: [
        {
          type: 'integer',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:slider_direction': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nOrientation of the slider movement.',
      oneOf: [{ $ref: '#/definitions/vl:orientation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_timeout': {
      markdownDescription: '**Type**: ```Slider```',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_collection_name': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nName of the item collection to be used.',
      oneOf: [{ $ref: '#/definitions/hc:collection_name' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_name': {
      markdownDescription: '**Type**: ```Slider```',
      type: 'string'
    },
    'prop:slider_select_on_hover': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_selected_button': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nID of the action for when the slider is selected.\t\n\t\n**Version**: ```+1.2```',
      default: 'slider.selected',
      oneOf: [{ $ref: '#/definitions/hc:button_id' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_deselected_button': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nID of the action for when the slider is deselected.\t\n\t\n**Version**: ```+1.2```',
      default: 'slider.deselected',
      oneOf: [{ $ref: '#/definitions/hc:button_id' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_box_control': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\nName of the control element that will behave as the slider thumb.',
      type: 'string'
    },
    'prop:background_control': {
      markdownDescription:
        "**Type**: ```Slider```\t\n\t\nName of the control that will behave as the slider background.\t\n\t\n**Info**: It's not needed if you just want a static background.\t\n\t\n**Version**: ```+1.2```",
      type: 'string',
      default: ''
    },
    'prop:background_hover_control': {
      markdownDescription:
        "**Type**: ```Slider```\t\n\t\nName of the control that will behave as the slider background on hover.\t\n\t\n**Info**: It's not needed if you just want a static background.\t\n\t\n**Version**: ```+1.2```",
      type: 'string',
      default: ''
    },
    'prop:progress_control': {
      markdownDescription:
        "**Type**: ```Slider```\t\n\t\nName of the control that will behave as the slider background overlay for the slider progress.\t\n\t\n**Info**: It's not needed if you just want a static background.\t\n\t\n**Version**: ```+1.2```",
      type: 'string',
      default: ''
    },
    'prop:progress_hover_control': {
      markdownDescription:
        "**Type**: ```Slider```\t\n\t\nName of the control that will behave as the slider background overlay for the slider progress on hover.\t\n\t\n**Info**: It's not needed if you just want a static background.\t\n\t\n**Version**: ```+1.2```",
      type: 'string',
      default: ''
    },
    'prop:slider_render_bar_background_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_render_bar_progress_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_render_bar_outline_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_render_bar_background_hover_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_render_bar_progress_hover_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:slider_render_bar_outline_hover_color': {
      markdownDescription: '**Type**: ```Slider```\t\n\t\n**Version**: ```0.16 - 1.1```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Slider Box
    'prop:indent_control': {
      markdownDescription: '**Type**: ```Slider Box```\t\n\t\nName of the child control to show only in the indent state.',
      type: 'string',
      examples: ['indent']
    },
    // Grid Page Indicator
    'prop:grid_item_when_current': {
      markdownDescription: '**Type**: ```Grid Page Indicator```',
      type: 'string'
    },
    'prop:grid_item_when_not_current': {
      markdownDescription: '**Type**: ```Grid Page Indicator```',
      type: 'string'
    },
    'prop:cycler_manager_size_control_target': {
      markdownDescription: '**Type**: ```Grid Page Indicator```',
      type: 'string'
    },
    // Tab (Legacy)
    'prop:tab_index': {
      markdownDescription: '**Type**: ```Tab (Legacy)```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:tab_control': {
      type: 'string',
      markdownDescription: '**Type**: ```Tab (Legacy)```\t\n\t\nName of the element that shows up when tab is selected.\t\n\t\n**Version**: ```0.16 - 1.0```'
    },
    'prop:tab_content': {
      type: 'string',
      markdownDescription: '**Type**: ```Tab (Legacy)```\t\n\t\nName of the element that shows up when tab is selected.\t\n\t\n**Version**: ```0.16 - 1.0```'
    },
    // Carousel Label (Legacy/Dev)
    'prop:always_rotate': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Version**: ```None```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:rotate_speed': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Version**: ```None```',
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:hover_color': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Version**: ```None```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:hover_alpha': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Default**: ```1.0```\t\n\t\n**Version**: ```None```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:pressed_color': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Version**: ```None```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:pressed_alpha': {
      markdownDescription: '**Type**: ```Carousel Label (Legacy/Dev)```\t\n\t\n**Default**: ```1.0```\t\n\t\n**Version**: ```None```',
      default: 1.0,
      oneOf: [
        {
          type: 'number',
          minimum: 0.0,
          maximum: 1.0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    // Grid
    'prop:grid_dimensions': {
      markdownDescription: '**Type**: ```Grid```\t\n\t\nNumber of columns and rows the grid has. __[columns, rows]__',
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'integer',
            minimum: 0
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:maximum_grid_items': {
      markdownDescription: '**Type**: ```Grid```\t\n\t\nMaximum number of items the grid will be able to generate.',
      oneOf: [
        {
          type: 'integer',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:grid_dimension_binding': {
      markdownDescription: '**Type**: ```Grid```',
      type: 'string'
    },
    'prop:grid_rescaling_type': {
      markdownDescription: '**Type**: ```Grid```',
      oneOf: [{ $ref: '#/definitions/vl:orientation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:grid_fill_direction': {
      markdownDescription: '**Type**: ```Grid```',
      oneOf: [{ $ref: '#/definitions/vl:orientation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:precached_grid_item_count': {
      markdownDescription: '**Type*: ```Grid```\t\n\t\n**Version**: ```1.2 - ?```',
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:grid_item_template': {
      markdownDescription: '**Type**: ```Grid```',
      type: 'string'
    },
    // Grid Item
    'prop:grid_position': {
      default: [],
      oneOf: [
        {
          type: 'array',
          minItems: 2,
          maxItems: 2,
          items: {
            type: 'integer',
            minimum: 0
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    // Edit Box
    'prop:text_box_name': {
      markdownDescription: "**Type**: ```Edit box```\t\n\t\nDifferent names, don't affect each others content. The names are hardcoded.",
      type: 'string',
      default: ''
    },
    'prop:text_edit_box_grid_collection_name': {
      markdownDescription: '**Type**: ```Edit box```\t\n\t\nName of the hardcoded item collection to be used. It can be empty.',
      type: 'string',
      default: ''
    },
    'prop:constrain_to_rect': {
      markdownDescription: '**Type**: ```Edit Box```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:enabled_newline': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\nAllows text box to be multiline.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:text_type': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\nWhich characters are allow in the text box.',
      oneOf: [{ $ref: '#/definitions/vl:text_type' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:max_length': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\nNumber of characters allowed.',
      oneOf: [
        {
          type: 'integer',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:text_control': {
      markdownDescription: '**Type**: ```Edit Box```',
      type: 'string'
    },
    'prop:place_holder_control': {
      markdownDescription: '**Type**: ```Edit Box```',
      type: 'string'
    },
    'prop:can_be_deselected': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\nText box can be deselected.\t\n\t\n**Default**: ```true```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_listening': {
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\n**Default**: ```true```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:virtual_keyboard_buffer_control': {
      type: 'string',
      markdownDescription: '**Type**: ```Edit Box```\t\n\t\n**Version**: ```+1.15/1.16```'
    },
    // Scroll View
    'prop:scrollbar_track_button': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nID of the action for the track button.',
      type: 'string',
      default: 'button.scrollbar_skip_track'
    },
    'prop:scrollbar_touch_button': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nID of the action for the touch input.',
      type: 'string',
      default: 'button.scrollbar_touch'
    },
    'prop:scroll_speed': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nScrolling speed.',
      default: 15,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:gesture_control_enabled': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nScrolling speed.',
      default: 15,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_handle_scrolling': {
      description: '**Type**: ```Scroll View```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:touch_mode': {
      markdownDescription: '**Type**: ```Scroll View```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:scrollbar_box': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nName of child UI element or nested UI element that will behave as the scrollbar thumb.',
      type: 'string'
    },
    'prop:scrollbar_track': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nName of child UI element or nested UI element that will behave as the scrollbar track.',
      type: 'string'
    },
    'prop:scroll_view_port': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nName of child UI element that will behave as the view port.',
      type: 'string'
    },
    'prop:scroll_content': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nName of child UI element that will behave as the content root parent.',
      type: 'string'
    },
    'prop:scroll_box_and_track_panel': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nName of child UI element that will contain the scrollbox and track controls.',
      type: 'string'
    },
    'prop:jump_to_bottom_on_update': {
      markdownDescription: '**Type**: ```Scroll View```\t\n\t\nJump to the bottom when the scrolling panel has an update. For example, adds more children to it.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:allow_scroll_even_when_content_fits': {
      markdownDescription: '**Type**: ```Scroll View```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Factory
    'prop:factory': {
      markdownDescription: '**Type**: ```Any```',
      oneOf: [
        {
          type: 'object',
          additionalItems: false,
          properties: {
            name: {
              type: 'string'
            },
            control_name: {
              type: 'string'
            },
            control_ids: {
              oneOf: [
                {
                  type: 'object',
                  additionalProperties: false,
                  patternProperties: {
                    '[a-zA-Z0-9_]+': {
                      type: 'string'
                    }
                  }
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            },
            factory_variables: {
              oneOf: [
                {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            },
            max_children_size: {
              oneOf: [
                {
                  type: 'integer',
                  minimum: 0
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            },
            insert_location: {
              oneOf: [{ enum: ['front'] }, { $ref: '#/definitions/vl:variable' }]
            },
            max_size: {
              oneOf: [
                {
                  type: 'integer',
                  minimum: 0
                },
                { $ref: '#/definitions/vl:variable' }
              ]
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:control_ids': {
      markdownDescription: '**Type**: ```Factory```',
      oneOf: [
        {
          type: 'object',
          additionalProperties: false,
          patternProperties: {
            '[a-zA-Z0-9_]+': {
              type: 'string'
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:control_name': {
      markdownDescription: '**Type**: ```Factory```',
      type: 'string'
    },
    // Data Binding
    'prop:bindings': {
      markdownDescription: '**Type**: ```Any```\t\n\t\nBind data (coming from the code) to this UI element to use.',
      oneOf: [
        {
          type: 'array',
          items: { $ref: '#/definitions/vl:binding_item' }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'vl:binding_item': {
      type: 'object',
      additionalItems: false,
      properties: {
        ignored: {
          markdownDescription: 'If binding is completely ignored.\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.17```',
          default: false,
          oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
        },
        binding_type: {
          description: 'Which kind of data binding will be used.',
          oneOf: [{ $ref: '#/definitions/vl:binding_type' }, { $ref: '#/definitions/vl:variable' }]
        },
        binding_name: {
          description: 'Stores the value of the data bind name or condition with it.',
          type: 'string'
        },
        binding_name_override: {
          markdownDescription: 'Name of the UI element property that will apply the stored value in ```binding_name```.\t\n\t\n**Requires**: ```binding_name```',
          type: 'string'
        },
        binding_collection_name: {
          markdownDescription: 'Name of the collection of items to be used.',
          type: 'string'
        },
        binding_collection_prefix: {
          markdownDescription: '**Requires**: ```binding_collection_name```',
          type: 'string'
        },
        binding_condition: {
          description: 'Condition for the data binding to happen.',
          oneOf: [{ $ref: '#/definitions/vl:binding_condition' }, { $ref: '#/definitions/vl:variable' }]
        },
        source_control_name: {
          description: 'Name of the UI element to observe its property values.',
          type: 'string'
        },
        source_property_name: {
          markdownDescription: 'Store the value of the property named of the UI element refered in ```source_control_name```.\t\n\t\n**Requires**: ```source_control_name```',
          type: 'string'
        },
        target_property_name: {
          markdownDescription:
            'The UI element property that the stored value in ```source_property_name``` will be applied to.\t\n\t\n**Requires**: ```source_property_name``` and ```source_control_name```',
          type: 'string'
        },
        resolve_sibling_scope: {
          default: false,
          oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
        }
      }
    },
    // Collection
    'prop:collection_name': {
      markdownDescription: '**Type**: ```Any```',
      type: 'string'
    },
    'prop:collection_index': {
      markdownDescription: '**Type**: ```Any```',
      oneOf: [
        {
          type: 'integer',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    // Focus
    'prop:default_focus_precedence': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      oneOf: [
        {
          type: 'integer',
          minimum: 0
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:focus_enabled': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_wrap_enabled': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```\t\n\t\n**Version**: ```+1.2```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_magnet_enabled': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```\t\n\t\n**Version**: ```+1.2```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_identifier': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      type: 'string'
    },
    'prop:focus_change_down': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      type: 'string'
    },
    'prop:focus_change_up': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      type: 'string'
    },
    'prop:focus_change_left': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      type: 'string'
    },
    'prop:focus_change_right': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      type: 'string'
    },
    'prop:focus_mapping': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Edit Box | Input Panel | Grid```',
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              focus_identifier: {
                type: 'string'
              },
              focus_change_right: {
                type: 'string'
              },
              focus_change_left: {
                type: 'string'
              },
              focus_change_up: {
                type: 'string'
              },
              focus_change_down: {
                type: 'string'
              }
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:focus_container': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_last_focus': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_navigation_mode_left': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n*Version**: ```+1.2```',
      oneOf: [{ $ref: '#/definitions/vl:focus_navigation_mode' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_navigation_mode_right': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n*Version**: ```+1.2```',
      oneOf: [{ $ref: '#/definitions/vl:focus_navigation_mode' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_navigation_mode_down': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n*Version**: ```+1.2```',
      oneOf: [{ $ref: '#/definitions/vl:focus_navigation_mode' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_navigation_mode_up': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n*Version**: ```+1.2```',
      oneOf: [{ $ref: '#/definitions/vl:focus_navigation_mode' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_container_custom_left': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ $ref: '#/definitions/vl:focus_container_custom' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_container_custom_right': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ $ref: '#/definitions/vl:focus_container_custom' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_container_custom_down': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ $ref: '#/definitions/vl:focus_container_custom' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:focus_container_custom_up': {
      markdownDescription: '**Type**: ```Panel | Stack Panel | Input Panel```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ $ref: '#/definitions/vl:focus_container_custom' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Input
    'prop:button_mappings': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```',
      default: false,
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              from_button_id: {
                description: 'ID of the action that fires the event.',
                type: 'string'
              },
              to_button_id: {
                description: 'ID of the action to be executed when event is fired.',
                type: 'string'
              },
              button_up_right_of_first_refusal: {
                description: 'Ignore first click.',
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              },
              mapping_type: {
                oneOf: [{ $ref: '#/definitions/vl:mapping_type' }, { $ref: '#/definitions/vl:variable' }]
              },
              ignored: {
                description: 'Mapping is ignored.',
                default: false,
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              },
              input_mode_condition: {
                oneOf: [{ $ref: '#/definitions/vl:input_mode_condition' }, { $ref: '#/definitions/vl:variable' }]
              },
              ignore_input_scope: {
                default: false,
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              },
              scope: {
                oneOf: [{ $ref: '#/definitions/vl:scope' }, { $ref: '#/definitions/vl:variable' }]
              },
              consume_event: {
                description: 'If false, it will not be focused.',
                default: true,
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              },
              handle_select: {
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              },
              handle_deselect: {
                oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
              }
            }
          }
        },
        { $ref: '#/definitions/vl:variable' }
      ]
    },
    'prop:modal': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:inline_modal': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\n**Version**: ```+1.1```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_listen_to_input': {
      markdownDescription: '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_handle_pointer': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\nAlways handle pointer even if it goes outside of the element.\t\n\t\n**Default**: ```false```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_handle_controller_direction': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.2```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:hover_enabled': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\n**Default**: ```true```\t\n\t\n**Version**: ```+1.2```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:prevent_touch_input': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\nPrevents touch events from firing.\t\n\t\n**Default**: ```false```\t\n\t\n**Version**: ```+1.10```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:consume_event': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\n**Version**: ```+1.2```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:consume_hover_events': {
      markdownDescription:
        '**Type**: ```Button | Toggle | Dropdown | Slider | Slider Box | Edit Box | Input Panel | Scrollbar Box | Scrollbar Track | Scroll View | Screen | Selection Wheel```\t\n\t\n**Version**: ```+1.11```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:gesture_tracking_button': {
      markdownDescription: '**Type**: ```Scroll View```',
      oneOf: [{ $ref: '#/definitions/hc:button_id' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Screen
    'prop:render_only_when_topmost': {
      markdownDescription: "**Type**: ```Screen```\t\n\t\nIf the screen should only render when it's the top most screen in the screen stack.",
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:screen_not_flushable': {
      markdownDescription: '**Type**: ```Screen```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:always_accepts_input': {
      markdownDescription: '**Type**: ```Screen```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:render_game_behind': {
      markdownDescription: '**Type**: ```Screen```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:absorbs_input': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\nIf the screen allows user input.',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:is_showing_menu': {
      markdownDescription: '**Type**: ```Screen```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:is_modal': {
      markdownDescription: '**Type**: ```Screen```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:should_steal_mouse': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\nIf the screen should hide the mouse.',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:low_frequency_rendering': {
      markdownDescription: "**Type**: ```Screen```\t\n\t\nIf the screen should only render when it's the top most screen in the screen stack.",
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:screen_draws_last': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\nIf the screen is the last screen in screen stack to be rendered.',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:vr_mode': {
      markdownDescription: '**Type**: ```Screen```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:force_render_below': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\nIf screens below in the screen stack should render below.',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:send_telemetry': {
      markdownDescription: '**Type**: ```Screen```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:close_on_player_hurt': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\nIf the screen should close when the player is hurt.',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:cache_screen': {
      markdownDescription: '**Type**: ```Screen```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:load_screen_immediately': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\n**Version**: ```+1.3/1.4```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:gamepad_cursor': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\n**Version**: ```+1.2```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:gamepad_cursor_deflection_mode': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\n**Version**: ```+1.15/1.16```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:should_be_skipped_during_automation': {
      markdownDescription: '**Type**: ```Screen```\t\n\t\n**Version**: ```+?```',
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Custom Renderer
    'prop:renderer': {
      markdownDescription: '**Type**: ```Custom```\t\n\t\nSpecial elements that are created in the code because they are too complex for JSON UI.',
      oneOf: [{ $ref: '#/definitions/vl:renderer' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Custom - Paper Doll Renderer
    'prop:camera_tilt_degrees': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:starting_rotation': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_selected_skin': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_uuid': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_skin_gui_scale': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:use_player_paperdoll': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:rotation': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer)```',
      oneOf: [{ $ref: '#/definitions/vl:rotation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:modelsize': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer | Netease Paper Doll Renderer)',
      default: 1.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:animation_looped': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer | Netease Paper Doll Renderer)',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:animation': {
      markdownDescription: '**Type**: ```Custom (Paper Doll Renderer | Netease Paper Doll Renderer)',
      type: 'string'
    },
    // Custom - Netease Paper Doll Renderer
    'prop:screen_offset': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)'
    },
    'prop:screen_scale': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      default: -1.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:mob_body_rot_y': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:mob_head_rot_y': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:init_rot_y': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      default: 0.0,
      oneOf: [{ type: 'number' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:skeleton_model_name': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      type: 'string'
    },
    'prop:entity_identifier': {
      markdownDescription: '**Type**: `` Custom (Netease Paper Doll Renderer)',
      type: 'string'
    },
    // Custom - Netease MiniMap Renderer
    // "prop:size_grade": {
    //   "markdownDescription": "**Types**: ``Custom (Mini Map Renderer)",
    // },
    'prop:use_default_face_icon': {
      markdownDescription: '**Types**: ``Custom (Mini Map Renderer)',
      default: true,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:face_icon_bg_color': {
      markdownDescription: '**Types**: ``Custom (Mini Map Renderer)',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:enable_live_update': {
      markdownDescription: '**Types**: ``Custom (Mini Map Renderer)',
      default: false,
      oneOf: [{ type: 'boolean' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:live_update_interval': {
      markdownDescription: '**Types**: ``Custom (Mini Map Renderer)',
      default: 60,
      oneOf: [{ type: 'integer' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:highest_y': {
      markdownDescription: '**Types**: ``Custom (Mini Map Renderer)',
      oneOf: [{ enum: [0, -1] }, { $ref: '#/definitions/vl:variable' }]
    },
    // Custom - Progress Bar Renderer
    'prop:primary_color': {
      markdownDescription: '**Type**: ```Custom (Prograss Bar Renderer)```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:secondary_color': {
      markdownDescription: '**Type**: ```Custom (Prograss Bar Renderer)```',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Custom - Gradient Renderer
    'prop:gradient_direction': {
      markdownDescription: '**Type**: ```Custom (Gradient Renderer)```\t\n\t\nDirection of the gradient.\t\n\t\n**Default**: ```vertical```',
      oneOf: [{ $ref: '#/definitions/vl:orientation' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:color1': {
      markdownDescription: '**Type**: ```Custom (Gradient Renderer)```\t\n\t\nColor of the top (```vertical```) or left (```horizontal```) half side. It can use alpha.',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:color2': {
      markdownDescription: '**Type**: ```Custom (Gradient Renderer)```\t\n\t\nColor of the bottom (```vertical```) or right (```horizontal```) half side. It can use alpha.',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Custom - Name Tag Renderer
    'prop:text_color': {
      markdownDescription: '**Type**: ```Custom (Name Tag Renderer)```\t\n\t\nColor of the name text. It can use alpha.',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    'prop:background_color': {
      markdownDescription: '**Type**: ```Custom (Name Tag Renderer)```\t\n\t\nColor of the name background. It can use alpha.',
      default: [],
      oneOf: [{ $ref: '#/definitions/vl:color' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Hover Text Renderer
    'prop:hover_text_max_width': {
      markdownDescription: '**Type**: ```Custom (Hover Text Renderer)```',
      oneOf: [{ type: 'number', minimum: 0 }, { $ref: '#/definitions/vl:variable' }]
    },
    // Debug Renderer
    'prop:debug': {
      markdownDescription: '**Type**: ```Any```',
      oneOf: [{ $ref: '#/definitions/vl:debug_color' }, { $ref: '#/definitions/vl:variable' }]
    },
    // Cycler
    'prop:target_cycler_to_compare': {
      markdownDescription: '**Type**: ```Label Cycler/Image Cycler```',
      default: '',
      type: 'string'
    },
    'prop:next_sub_page_button_name': {
      markdownDescription: '**Type**: ```Label Cycler/Image Cycler```',
      default: '',
      type: 'string'
    },
    'prop:prev_sub_page_button_name': {
      markdownDescription: '**Type**: ```Label Cycler/Image Cycler```',
      default: '',
      type: 'string'
    },
    //// Label Cycler
    'prop:text_labels': {
      markdownDescription: '**Type**: ```Label Cycler```',
      oneOf: [
        { $ref: '#/definitions/vl:variable' },
        {
          default: [],
          type: 'array',
          items: {
            type: 'string'
          }
        }
      ]
    },
    //// Image Cycler
    'prop:images': {
      markdownDescription: '**Type**: ```Image Cycler```',
      oneOf: [
        { $ref: '#/definitions/vl:variable' },
        {
          default: [],
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              texture_path: {
                type: 'string'
              }
            }
          }
        }
      ]
    },
    'vl:variable': {
      type: 'string',
      pattern: '^((\\$|#)[a-zA-Z0-9_.]+|\\(.*\\))$'
    },
    'vl:animation': {
      type: 'string',
      pattern: '^@[a-zA-Z0-9_.]+$'
    },
    'vl:type': {
      enum: [
        'selection_wheel',
        'panel',
        'screen',
        'stack_panel',
        'label',
        'image',
        'input_panel',
        'custom',
        'grid',
        'factory',
        'button',
        'toggle',
        'slider',
        'edit_box',
        'dropdown',
        'scroll_view',
        'slider_box',
        'scrollbar_box',
        'scroll_track',
        'grid_page_indicator',
        'image_cycler',
        'label_cycler',
        // Legacy
        'tab',
        'carousel_label',
        // Netease
        'combox',
        'layout',
        'stack_grid',
        'joystick',
        'rich_text',
        'sixteen_nine_layout',
        'mul_lines'
      ]
    },
    'vl:anchor': {
      enum: ['top_left', 'top_middle', 'top_right', 'left_middle', 'center', 'right_middle', 'bottom_left', 'bottom_middle', 'bottom_right']
    },
    'vl:orientation': {
      enum: ['vertical', 'horizontal', 'none']
    },
    'vl:text_alignment': {
      enum: ['left', 'right', 'center']
    },
    'vl:font_type': {
      enum: ['default', 'rune', 'unicode', 'smooth']
    },
    'vl:font_size': {
      enum: ['small', 'normal', 'medium', 'large', 'extra_large']
    },
    'vl:clip_direction': {
      enum: ['left', 'right', 'up', 'down', 'center']
    },
    'vl:color': {
      type: 'array',
      items: {
        type: 'number',
        maximum: 1,
        minimum: 0
      },
      minItems: 3,
      maxItems: 4
    },
    'vl:mc_color': {
      enum: ['white', 'black', 'yellow', 'orange', 'green', 'purple', 'nil', 'cyan', 'red', 'grey', 'gray', 'blue']
    },
    'vl:debug_color': {
      enum: ['white', 'black', 'gray', 'red', 'blue', 'green', 'yellow', 'purple']
    },
    'vl:offset': {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: {
        oneOf: [
          {
            type: 'string',
            pattern: '^(default|((\\s*(\\+|-)+\\s*)?((\\d+(.\\d+)?(px|%(c|y|x|cm|sm)?)|default))\\s*){1,})$'
          },
          { type: 'number' }
        ]
      }
    },
    'vl:size': {
      type: 'array',
      minItems: 2,
      maxItems: 2,
      items: {
        oneOf: [
          {
            type: 'string',
            pattern: '^(fill|default|((\\s*(\\+|-)+\\s*)?\\s*\\d+(.\\d+)?(c%|px|%(c|y|x|cm|sm)?)\\s*){1,})$',
            examples: ['fill', 'default']
          },
          { type: 'number' }
        ]
      }
    },
    'vl:rotation': {
      enum: ['none', 'auto', 'gesture_x', 'custom_y']
    },
    'vl:binding_type': {
      enum: ['global', 'collection', 'collection_details', 'view', 'none']
    },
    'vl:binding_condition': {
      enum: ['none', 'always', 'always_when_visible', 'visible', 'once', 'visibility_changed']
    },
    'vl:anim_type': {
      enum: ['alpha', 'clip', 'color', 'flip_book', 'offset', 'size', 'uv', 'wait', 'aseprite_flip_book']
    },
    'vl:renderer': {
      enum: [
        // Exclusive
        'fill_renderer',
        //
        'hover_text_renderer',
        '3d_structure_renderer',
        'splash_text_renderer',
        'ui_holo_cursor',
        'trial_time_renderer',
        'panorama_renderer',
        'actor_portrait_renderer',
        'banner_pattern_renderer',
        'live_player_renderer',
        'web_view_renderer',
        'hunger_renderer',
        'bubbles_renderer',
        'mob_effects_renderer',
        'cursor_renderer',
        'progress_indicator_renderer',
        'camera_renderer',
        'horse_jump_renderer',
        'armor_renderer',
        'horse_heart_renderer',
        'heart_renderer',
        'hotbar_cooldown_renderer',
        'hotbar_renderer',
        'hud_player_renderer',
        'live_horse_renderer',
        'holographic_postrenderer',
        'enchanting_book_renderer',
        'debug_screen_renderer',
        'gradient_renderer',
        'paper_doll_renderer',
        'name_tag_renderer',
        'flying_item_renderer',
        'inventory_item_renderer',
        'credits_renderer',
        'vignette_renderer',
        'progress_bar_renderer',
        'debug_overlay_renderer',
        'background_renderer',
        'bundle_renderer',
        'editor_gizmo_renderer',
        'dash_renderer',
        // Chemistry
        'bohr_model_renderer',
        // 0.16
        'toast_renderer',
        // Netease
        'netease_paper_doll_renderer',
        'netease_mini_map_renderer'
      ]
    },
    'vl:easing': {
      enum: [
        'linear',
        'spring',
        'in_quad',
        'out_quad',
        'in_out_quad',
        'in_cubic',
        'out_cubic',
        'in_out_cubic',
        'in_quart',
        'out_quart',
        'in_out_quart',
        'in_quint',
        'out_quint',
        'in_out_quint',
        'in_sine',
        'out_sine',
        'in_out_sine',
        'in_expo', // +1.1
        'out_expo',
        'in_out_expo',
        'in_circ',
        'out_circ',
        'in_out_circ',
        'in_bounce',
        'out_bounce',
        'in_out_bounce',
        'in_back',
        'out_back', // +1.3/1.4
        'in_out_back',
        'in_elastic',
        'out_elastic',
        'in_out_elastic'
      ]
    },
    'vl:mapping_type': {
      enum: ['global', 'pressed', 'double_pressed', 'focused']
    },
    'vl:scope': {
      enum: ['global', 'view', 'controller']
    },
    'vl:input_mode_condition': {
      enum: [
        'any',
        'not_gaze',
        'not_gamepad',
        'gamepad_and_not_gaze' // +1.2
      ]
    },
    'vl:text_type': {
      enum: ['ExtendedASCII', 'IdentifierChars', 'NumberChars']
    },
    'vl:focus_container_custom': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          other_focus_container_name: {
            type: 'string'
          }
        }
      }
    },
    'vl:focus_navigation_mode': {
      enum: ['contained', 'none', 'custom', 'stop', '']
    },
    'vl:global_variables': {
      enum: [
        '$store_disabled',
        '$game_pad',
        '$mouse',
        '$touch',
        '$trial',
        '$build_platform_UWP',
        '$win10_edition',
        '$ignore_add_servers',
        '$disable_gamertag_controls',
        '$console_edition',
        '$osx_edition',
        '$pocket_edition',
        '$education_edition',
        '$world_archive_support',
        '$file_picking_supported',
        '$desktop_screen',
        '$pocket_screen',
        '$is_holographic',
        '$gear_vr',
        '$oculus_rift',
        '$is_living_room_mode',
        '$is_reality_mode',
        '$realms_beta',
        '$fire_tv',
        '$is_ios',
        '$apple_tv',
        '$is_windows_10_mobile',
        '$image_picking_not_supported',
        '$pre_release',
        '$ios',
        '$is_console',
        '$can_quit',
        '$is_settopbox',
        '$microsoft_os',
        '$apple_os',
        '$google_os',
        '$nx_os',
        '$horizontal_safezone_size',
        '$vertical_safezone_size',
        '$can_splitscreen',
        '$is_secondary_client',
        '$multiplayer_requires_live_gold',
        '$xbox_one',
        '$is_pregame',
        '$is_win10_arm',
        '$vibration_supported',
        '$is_mobile_vr',
        '$is_xboxlive_enabled',
        '$device_must_be_removed_for_xbl_signin',
        '$is_publish',
        '$is_desktop',
        '$is_ps4',
        '$is_on_3p_server',
        '$ignore_3rd_party_servers',
        '$is_berwick',
        '$edit_mode' // Only for Add External Server
      ]
    },
    'hc:button_id': {
      enum: [
        'any',
        'button.menu_network_join_by_code_close',
        'button.submit_rating',
        'command_block.input_minimize',
        'button.leave_on_device',
        'button.menu_vr_back',
        'button.mouse_clicked_vralign',
        'button.cartography_result_take_all_place_all',
        'button.menu_tab_right',
        'button.next_page',
        'button.prev_page',
        'button.book_exit',
        'button.menu_tab_left',
        'button.picked_inventory',
        'button.picked',
        'button.close_dialog',
        'button.auth_cancel',
        'button.cancel',
        'button.menu_cancel',
        'button.menu_exit',
        'button.menu_select',
        'button.menu_ok',
        'button.anvil_take_all_place_all',
        'button.menu_secondary_select',
        'button.controller_select',
        'button.menu_auto_place',
        'button.container_auto_place',
        'button.drop_one',
        'button.menu_inventory_drop',
        'button.controller_secondary_select',
        'button.menu_inventory_drop_all',
        'button.drop_all',
        'button.anvil_coalesce_stack',
        'button.container_slot_hovered',
        'button.menu_down',
        'button.menu_up',
        'button.menu_left',
        'button.menu_right',
        'button.reopen_keyboard',
        'button.menu_autocomplete',
        'button.menu_autocomplete_back',
        'button.menu_textedit_up',
        'button.menu_textedit_down',
        'button.send_message',
        'button.respawn_button',
        'button.main_menu_button',
        'button.button_hovered',
        'button.container_unselect_slot',
        'button.container_take_all_place_all',
        'button.container_take_half_place_one',
        'button.prev_skin',
        'button.next_skin',
        'button.player_profile_card',
        'button.wake_up_button',
        'button.menu_continue',
        'button.menu_vr_realign',
        'button.portfolio_delete_photo_left',
        'button.portfolio_delete_photo_right',
        'button.portfolio_page_prev',
        'button.portfolio_page_next',
        'button.portfolio_export',
        'button.hotbar_ok',
        'button.dropdown_exit',
        'button.scrollbar_skip_track',
        'button.scrollbar_touch',
        'button.slot_pressed',
        'button.inventory_left',
        'button.inventory_right',
        'button.hotbar_inventory_left',
        'button.hotbar_inventory_right',
        'button.hide_gui',
        'button.hide_gui_hud',
        'button.slot1',
        'button.slot_1',
        'button.slot2',
        'button.slot_2',
        'button.slot3',
        'button.slot_3',
        'button.slot4',
        'button.slot_4',
        'button.slot5',
        'button.slot_5',
        'button.slot6',
        'button.slot_6',
        'button.slot7',
        'button.slot_7',
        'button.slot8',
        'button.slot_8',
        'button.slot9',
        'button.slot_9',
        'button.slot0',
        'button.slot_0',
        'button.turn_doll',
        'button.realm_invitation_accept',
        'button.realm_invitation_decline',
        'button.realms_invite_plus',
        'button.realms_invite_minus',
        'button.realms_invite_undo',
        'button.realms_invite_add_friends',
        'button.menu_realm_send_invites',
        'button.select_screenshot',
        'button.view_skin',
        'button.skin_hovered',
        'button.skin_unhovered',
        'button.default_skin_hovered',
        'button.view_default_skin',
        'button.view_premium_skin',
        'button.premium_skin_unhovered',
        'button.premium_skin_hovered',
        'button.view_recent_skin',
        'button.recent_skin_hovered',
        'button.select_offer',
        'button.menu_play',
        'button.coalesce_stack',
        'button.shape_drawing',
        'button.container_auto_place_one',
        'button.container_select_slot',
        'button.container_reset_held',
        'button.menu_inventory_cancel',
        'button.cursor_drop_all',
        'button.cursor_drop_one',
        'button.menu_tab_cycle',
        'button.chat',
        'button.show_skip',
        'button.pan_left',
        'button.pan_right',
        'button.scroll_map',
        'modal.escape',
        'popup_dialog.escape',
        'button.achievement_focus_filler',
        'button.play_button',
        'button.remove_button',
        'button.save_button',
        'button.action',
        'button.set_text',
        'button.hide_chat',
        'button.remove_trial',
        'button.menu_check_store',
        'button.new_world',
        'button.new_realm',
        'button.enchant',
        'button.file_upload_play',
        'button.file_upload_cancel',
        'button.file_upload_wifi_warning_continue',
        'button.menu_save_and_exit',
        'button.menu_reset_default',
        'button.menu_yes',
        'button.menu_no',
        'button.mobeffects',
        'button.deselect_resource',
        'button.searchClear',
        'button.restore_store',
        'button.coin_wallet',
        'featured_item_collection',
        'button.select_featured_screenshot',
        'button.select_featured',
        'button.select_item',
        'button.turn_structure',
        'button.upload_legacy_world',
        'button.realms_invite_cancel',
        'button.realms_invite_new_link',
        'button.realms_invite_copy',
        'button.realms_invite_share',
        'button.realms_invite_refresh',
        'button.realms_invite_share_close',
        'button.realms_invite_share_by_link',
        'button.realms_invite_find_friends',
        'button.realms_invite_unblock',
        'button.delete_action',
        'button.exit_student',
        'button.menu_permission',
        'button.delete_item',
        'button.screenshot',
        'button.screenshotpicker_next_button',
        'button.screenshotpicker_prev_button',
        'button.screenshot_new_post_close',
        'button.cycle_pack_right',
        'button.cycle_pack_left',
        'button.controller_cycle_pack_left',
        'button.controller_cycle_pack_right',
        'button.signin',
        'button.cycle_offer_right',
        'button.cycle_offer_left',
        'button.cycle_recipe_left',
        'button.cycle_recipe_right',
        'button.search',
        'button.controller_secondary_select_left',
        'button.controller_secondary_select_right',
        'button.focus_left',
        'button.focus_right',
        'button.edu_feedback',
        'button.edu_resources',
        // +0.16
        'button.menu_achievements',
        'button.binding_button',
        'button.reset_binding',
        'button.reset_keyboard_bindings',
        'button.reset_gamepad_bindings',
        'sign_in_button',
        'change_gamertag_button',
        'manage_account_button',
        'sign_out_button',
        'button.selected_pack_global',
        'button.deselected_pack_global',
        'button.available_pack_global',
        'button.move_left_global',
        'button.sort_up_global',
        'button.sort_down_global',
        'menu_download_world',
        'menu_upload_world',
        'menu_reset_world',
        'play_world_button',
        'convert_to_infinite_button',
        'delete_world_button',
        'export_world_button',
        'button.keyboard_toggle',
        'button.menu_binding_start',
        'button.hotbar_inventory_button',
        'button.menu_friend_select',
        'button.add_friend',
        'button.add_member',
        'button.send_invites',
        'button.npc_open_uri',
        'button.menu_invite_players',
        'button.menu_buy_game',
        'button.menu_quit',
        'button.menu_settings',
        'button.pause_focus_filler',
        'button.menu_open_uri',
        'button.menu_realms_world_item',
        'button.menu_realms_world_item_edit',
        'button.menu_realms_world_item_remove',
        'button.menu_network_world_item',
        'button.menu_network_server_world_edit',
        'button.local_world_upload',
        'button.menu_local_world_item',
        'button.menu_local_world_item_edit',
        'button.menu_network_add_friend',
        'button.menu_network_add_external',
        'button.new_world_upload',
        'button.menu_local_world_create',
        'button.archived_world_upload',
        'button.menu_import_level',
        'button.menu_realm_world_create',
        'button.menu_invite_notification',
        'button.menu_xbox_signin',
        'popup_dialog.first_button',
        'popup_dialog.second_button',
        'button.realms_duration_short',
        'button.realms_duration_long',
        'button.tos_popup',
        'button.create_realm',
        'menu_realms_manage_subscription',
        'menu_realms_renew_subscription',
        'menu_realms_extend_consumable',
        'menu_realms_renew_consumable',
        'menu_open_realm',
        'menu_close_realm',
        'select_realm_branch',
        'prev_page_button',
        'next_page_button',
        'button.buy_pack',
        'button.try_pack',
        'button.create_world',
        'button.copy_global',
        'button.choose_custom_skin',
        'button.undo_skin',
        'button.accept_skin',
        'button.choose_skinny',
        'button.choose_fat',
        'button.xbl_signin',
        'button.menu_store',
        'button.xbl_notnow',
        'button.selected_pack_level',
        'button.available_pack_level',
        'button.move_left_level',
        'button.sort_up_level',
        'button.selected_pack_addon',
        'button.available_pack_addon',
        'button.move_left_addon',
        'button.sort_up_addon',
        // +1.0
        'choose_ugc_level_seed',
        'button.delete_manifest',
        'button.copy_to_clipboard',
        'button.refresh_manifest',
        'button.prompt_for_action',
        'button.menu_store_offer',
        'button.activate_pack',
        '#button_cancel',
        '#button_accept',
        '#button_detect_structure',
        '#button_save_structure',
        '#button_selector_rotation_prev',
        '#button_selector_rotation_next',
        '#button_selector_mirror_prev',
        '#button_selector_mirror_next',
        '#button_selector_show_bounding_box_prev',
        '#button_selector_show_bounding_box_next',
        '#button_load_structure',
        '#button_selector_prev',
        '#button_selector_next',
        'button.ugc_item',
        'button.generate_random',
        'button.help',
        'button.menu_world_template_clicked',
        'button.menu_invalid_world_template_clicked',
        'button.menu_loading_world_template_clicked',
        'patch_notes_button',
        'button.attribution_popup',
        'button.report_errors_global',
        'button.invalid_pack_global',
        'button.report_errors_level',
        'button.invalid_pack_level',
        'button.report_errors_addon',
        'button.invalid_pack_addon',
        'button.remove_pack_button',
        'button.filter_1',
        'button.filter_2',
        'button.filter_3',
        'button.group_1',
        'button.group_2',
        'button.deleteResources',
        'button.shareResources',
        'button.generateTextureList',
        'button.updateResource',
        'button.warningDependency',
        // +1.1
        'button.purchase_coins',
        'command_block.input_maximize',
        'button.save_to_xbl',
        'keyboard_button',
        'button.menu_realm_world_trial',
        'button.menu_start_local_world',
        'button.menu_start_realms_world',
        'button.join_and_download_all',
        'button.join_and_download_needed',
        'button.join',
        'button.tos_hyperlink',
        'button.remix_preview_cancel',
        'button.remix_preview_upload',
        'button.polymorphic_button_press',
        'button.confirm_button',
        'button.skinpacks',
        'button.texturepacks',
        'button.worlds',
        'button.mashups',
        'button.structure_export',
        'button.structure_reset',
        'export_template_button',
        'button.port_internal_files',
        'button.clear_puchase_inventory',
        'button.add_coins',
        'setup_safe_zone_button',
        // +1.2
        'button.info_accept',
        'button.swap_page_left',
        'button.insert_text_page',
        'button.insert_photo_page',
        'button.delete_page',
        'button.swap_page_right',
        'button.edit_page',
        'button.finalize',
        'button.export_book',
        'button.sign_book',
        'button.report_club',
        'button.report_xbox',
        'button.comment_delete_feed_item',
        'button.comment_feed_report_club',
        'button.comment_feed_report_xbox',
        'button.comment_delete_feed_item_comment',
        'button.submit_comment',
        'button.host_toggle',
        'button.sub_command',
        'button.host_main',
        'button.teleport_clear',
        'button.menu_navigation',
        'button.defaultNoAction',
        'button.authorName',
        'button.scrollToRateContent',
        'user_confirm_dialog.escape',
        'user_confirm_dialog.left_button',
        'user_confirm_dialog.middle_button',
        'user_confirm_dialog.rightcancel_button',
        'button.advanced_settings',
        'button.expand_action_edit',
        'button.add_url',
        'button.add_command',
        'button.student_button',
        'button.menu_server_store',
        'button.menu_how_to_play',
        'button.menu_feed',
        'button.menu_realms_feed',
        'button.convert_legacy_world',
        'button.menu_network_join_by_code',
        'button.connect_to_third_party_server',
        'button.menu_sync_legacy_worlds',
        'button.menu_network_join_by_code_popup_join',
        'button.no_photo_alert_ok',
        'button.realms_player_count_2',
        'button.realms_player_count_10',
        'next_page_button_members',
        'prev_page_button_members',
        'next_page_button_invited_friends',
        'prev_page_button_invited_friends',
        'next_page_button_uninvited_friends',
        'prev_page_button_uninvited_friends',
        'next_page_button_blocked_players',
        'prev_page_button_blocked_players',
        'button.edit',
        'button.share_screenshot',
        'button.form_button_click',
        'button.submit_custom_form',
        'button.equip_skin',
        'button.more_suggested_content_offers',
        'button.show_more_offers',
        'button.future_promo',
        'button.past_promo',
        'button.unwrap_promo',
        'button.report',
        'button.view_terms',
        'button.back',
        'button.play',
        'button.reset_touch_bindings',
        'copy_world_button',
        'menu_manage_feed',
        'button.reset_settings',
        'button.licensed_content_popup',
        'button.start_broadcast',
        'button.get_mixer_create',
        'button.launch_mixer_create',
        'dev_clear_store_cache_button',
        'dev_clear_all_cache_button',
        'button.remove_treatment',
        'button.reset_to_default_treatments',
        'button.add_treatment',
        'button.clear_treatment_list',
        'dev_update_override_date_button',
        // +1.3/1.4
        'button.chat_menu_cancel',
        'button.mute_chat',
        'button.send',
        'button.controller_start',
        'button.controller_autocomplete',
        'button.controller_autocomplete_back',
        'button.controller_textedit_up',
        'button.controller_textedit_down',
        'button.comment_next_button',
        'button.comment_prev_button',
        'button.comment_options_close',
        'button.comment_feed_options_close',
        'button.menu_leave_screen',
        'button.newpost',
        'button.feed_next_button',
        'button.feed_prev_button',
        'button.add_screenshot',
        'button.feed_comment',
        'button.feed_new_post_close',
        'button.feed_options_close',
        'button.feed_image',
        'button.scoreboard',
        'button.hide_gui_all',
        'button.hide_tooltips',
        'button.hide_tooltips_hud',
        'button.hide_paperdoll',
        'button.hide_paperdoll_hud',
        'button.left_panel_tab_decrement',
        'button.right_panel_tab_decrement',
        'button.menu_alternate_tab_left',
        'button.left_panel_tab_increment',
        'button.menu_alternate_tab_right',
        'button.right_panel_tab_increment',
        'button.shift_pane_focus',
        'button.menu_clear',
        'button.touch_deselect',
        'button.destroy_selection',
        'button.clear_hotbar_or_remove_one',
        'button.try_menu_exit',
        'button.layout_increment',
        'button.layout_decrement',
        'button.recipe_search',
        'button.clear_hotbar_or_drop',
        'button.leave',
        'button.manage_feed_next_button',
        'button.manage_feed_prev_button',
        'button.manage_feed_delete',
        'button.manage_feed_ignore',
        'button.cycle_screenshots_right',
        'button.cycle_screenshots_left',
        'button.menu_skins',
        'button.realms_options_close',
        'button.clear_members',
        'button.menu_offline',
        'button.search_clear',
        'button.online_button',
        'button.local_button',
        'button.access',
        'button.manage_feed',
        'button.share_feed_item',
        'button.feed_report_club',
        'button.feed_report_xbox',
        'button.delete_feed_item',
        'button.continue',
        'button.read_more',
        'button.rateContent',
        'button.createWorld',
        'button.activateTexturePack',
        'button.homeButton',
        'button.dialog_button',
        'button.tos_ios_appletv',
        'button.privpol_hyperlink',
        'button.privpol_popup',
        'select_matching_realm_ref',
        'select_realm_backup',
        'button.backup_download',
        'button.member_list_options',
        'button.menu_quick_play',
        'button.inventory',
        'button.select_hero_offer',
        'button.filter',
        'button.sort',
        'button.exit_filter_menu',
        'button.close_filter_menu',
        'button.filter_pack_type',
        'button.filter_creator',
        'button.filter_installed_state',
        'button.clear_all_filters',
        'button.close_sort_menu',
        'button.remove_friend',
        'button.terms_and_conditions_popup',
        // +1.5
        'button.ios_error_sign_in',
        'button.menu_realm_nintendo_first_realm_purchase_button',
        'button.rating_yes_button',
        'button.rating_no_button',
        'button.my_account',
        'button.manage_invites_popup',
        // +1.6
        'button.chat_autocomplete',
        'button.chat_autocomplete_back',
        'button.chat_previous_message',
        'button.chat_next_message',
        'button.open_chat_settings',
        'button.chat_settings_menu_cancel',
        'button.temp_name',
        'button.structure_load',
        'button.structure_save',
        'button.tabbed_buy_now_button',
        'button.clear_msa_token_button',
        'button.redirect_to_upsell',
        // +1.7
        'button.close_chat_settings',
        'button.close_result_panel',
        'button.open_font_section',
        'button.split_left',
        'button.split_right',
        'button.reset',
        'button.maximize',
        'button.restore',
        'button.editor_button',
        'button.share',
        'button.score_player_profile_card',
        'button.nav_button',
        'button.sync_now',
        // +1.8
        'button.select_skin',
        'button.download_cancel',
        'button.play_video',
        'button.sync_later',
        'button.trade_take_all_place_all',
        'button.trade_coalesce_stack',
        'button.buy',
        'button.confirm',
        'button.open_color_section',
        'button.open_default_chat_colors',
        'button.open_mention_colors',
        'button.see_pack_in_store',
        'button.undo',
        'button.import_world',
        'button.launch_world',
        'button.find_more_worlds',
        'button.leave_feedback',
        'button.library_item',
        'button.seeMoreBy',
        'button.select_bundle_offer',
        'button.expand_view',
        'button.menu_library',
        'button.store_home',
        // +1.9
        'button.left_button',
        'button.right_button',
        'button.open_mute_section',
        'button.menu_feedback',
        'menu_realms_delete_realm',
        'button.select_template',
        'button.see_more_templates',
        'unlock_templated_world_options',
        'button.add_treatment_by_name',
        'reset_random_tick_speed',
        // +1.10
        'button.signIn',
        'button.acceptEula',
        'button.focus_filler',
        'button.confirm_bundle_purchase',
        'button.reset_chat_settings',
        'button.open_chat_colors',
        'button.starter_buy_now_button',
        'button.master_buy_now_button',
        'button.pack_select',
        'dev_reset_date_button',
        // +1.11
        'button.grindstone_take_all_place_all',
        'button.grindstone_coalesce_stack',
        'button.pattern_select',
        'button.loom_result_take_all_place_all',
        'button.is_hovered',
        'button.stone_select',
        'button.stonecutter_result_take_all_place_all',
        'button.trade_select',
        'button.trade_secondary_select',
        'button.trade_toggle_hovered',
        'button.trade_details',
        'button.trade_details_1',
        'button.trade_details_2',
        'button.enchantment_details',
        'button.trade',
        'button.update',
        'dev_update_override_version_button',
        // +1.12
        'button.debug_refresh_popup',
        'button.debug_reset',
        'button.debug_toggle_ios',
        'button.menu_choose_realm',
        'button.active_lesson.join',
        'button.active_lesson.start',
        'button.active_lesson.continue',
        'button.active_lesson.restart',
        'button.active_lesson.try_it_now',
        'button.active_lesson.load_link',
        'button.lesson_item',
        'button.apply_to_realm',
        'button.menu_courses',
        'button.menu_tutorial',
        'button.switch_accounts',
        'button.structure_3D_export',
        'template_image_picker_button',
        'template_localization_picker_button',
        'button.leak_memory',
        'button.open_content_log_history',
        // +1.13
        'button.close_share_popup',
        'button.nested_background',
        'button.play_on_realm_close',
        'button.playWithFriends',
        'button.playSolo',
        'button.addAppearance',
        'button.try_exiting',
        'button.pressedArrowLeft',
        'button.pressedArrowRight',
        'button.preview_skin',
        'button.subcategory_button_hovered',
        'button.piece_button_hovered',
        'button.asset_button_hovered',
        'button.is_appearance_status_hovered',
        'button.to_profile_or_skins_screen',
        'button.active_lesson.popup_close',
        'locked_tooltip.is_hovered',
        'button.button',
        'button.ten_player',
        'button.two_player',
        'button.faq_screen',
        'button.active_lesson.host',
        'button.menu_custom_world_template_clicked',
        'dayOneExperience.next_screen',
        'button.world_picker_skip',
        'button.generate_joincode',
        'button.stop_hosting',
        'button.start_hosting',
        'button.menu_quiz',
        'remove_player_button',
        'button.view_worlds',
        'button.create_new.new',
        'button.create_new.from_template',
        'button.view_library',
        'button.create_new',
        'button.join_world_popup',
        'button.import',
        'button.templates.local_template',
        'button.templates.view_more',
        'button.worlds.new_world.new',
        'button.worlds.new_world.template',
        'button.worlds.new_world',
        'button.worlds.entry.play',
        'button.worlds.entry.host',
        'button.worlds.entry.settings',
        'button.worlds.world_button',
        'button.immersive_reader',
        'button.error.try_again',
        'button.join_server',
        'button.entered_entries',
        'button.entry_grid_button',
        'button.entry_clear',
        'button.entry_confirm',
        'button.entry_ip',
        'button.connecting_cancel',
        'button.join_world',
        'button.found_cancel',
        'button.debug_button',
        'button.error_try_again',
        'button.take_quiz',
        'button.share_world_link',
        'button.active_lesson.join_server',
        'button.active_lesson.join_ip',
        'button.star_toggle',
        'button.realms_plus',
        'button.ignore_me',
        'button.read_toggle',
        'button.real_money_purchase',
        'button.coin_purchase',
        'button.featured_skin_pack_pressed',
        'button.change_height',
        'button.change_arm_size',
        'button.swap_color_channel_right',
        'button.swap_color_channel_left',
        'button.toggle_skin_color_picker',
        'button.swap_to_left_limb',
        'button.swap_to_right_limb',
        'button.change_piece_color',
        'button.none_piece_option',
        'button.cycle_featured_content',
        'button.subcategory_selected',
        'button.body_category_selected',
        'button.body_category_unselected',
        'button.style_category_selected',
        'button.style_category_unselected',
        'button.skin_selected_skins_page',
        'button.skin_selected',
        'button.expand_skin_pack',
        'button.default_skin_selected',
        'button.skin_pack_category_to_owned',
        'button.skin_pack_category_unselected',
        'button.skin_pack_category_selected',
        'button.menu_legacy_world_item_delete',
        'button.show_capes',
        'button.manage_appearance',
        'button.edit_appearance_preset',
        'button.randomize_appearance',
        'button.delete_appearance_preset',
        'button.retry_appearance_preset',
        'button.achievements',
        'button.settings',
        'button.more_info',
        'button.renew',
        'menu_realms_manage_subscriptions',
        'button.continue_button',
        'button.viewpacks',
        'button.launch_editions',
        'button.menu_crossplatform',
        'button.filter_offer_type',
        'button.copy_share_link',
        'button.load_game',
        'button.return',
        'button.menu_realms_plus_template_clicked',
        'button.more_realms_plus_templates',
        'button.more_custom_templates',
        'clear_player_data',
        'play_world_on_realm_button',
        'play_world_edu_button',
        'dev_delete_all_personas',
        'dev_delete_legacy_persona',
        'button.reset_day_one_experience',
        'button.open_core_ui_tests',
        'button.credits',
        'button.clear_content_log_files',
        'button.view_account_errors',
        'button.open_core_ui_docs',
        'button.action_button',
        'button.view_all_packs',
        // +1.14
        'button.unlink',
        'button.previous_friends_page',
        'button.next_friends_page',
        'button.fake_button',
        'button.proceed',
        'button.to_profile_screen',
        'button.dev_reset_online_safety_option',
        'button.unlink_msa',
        // +1.15/1.16
        'button.emote_selected',
        'button.rebind_mode',
        'button.dressing_room',
        'key.emote',
        'button.select_emote_slot_0',
        'button.select_emote_slot_1',
        'button.select_emote_slot_2',
        'button.select_emote_slot_3',
        'button.select_emote_slot_4',
        'button.select_emote_slot_5',
        'button.navigate_to_persona',
        'button.cancel_purchase_show_demo_choice',
        'button.cancel_join_realm',
        'button.service',
        'button.rebind_emote',
        'button.exit_done',
        'sunsetting.moreInfo',
        'button.user_rating_star_toggle',
        'button.select_bundle_summary_offer',
        'button.kick',
        'button.ban',
        'button.view_achievement',
        'button.collect_achievement',
        'button.cycle_featured_skins_left',
        'button.cycle_featured_skins_right',
        'button.to_realms_plus',
        'button.cycle_featured_pieces_left',
        'button.cycle_featured_pieces_right',
        'button.category_selected',
        'button.category_unselected',
        'button.owned_category_selected',
        'button.owned_category_unselected',
        'button.purchasable_category_selected',
        'button.purchasable_category_unselected',
        'button.realms_plus_category_selected',
        'button.realms_plus_category_unselected',
        'button.emote_slot_selected',
        'button.play_emote_again',
        'button.remove_emote',
        'button.description_read_toggle',
        'button.news_read_toggle',
        'button.import_beta_retail_local_world',
        'button.realms_warning_more_info',
        'button.import_beta_retail_legacy_world',
        'button.navigate_screenshots_right',
        'button.navigate_screenshots_left',
        'button.menu_network_server_item',
        'button.join_server_anyway',
        'button.cancel_join_server',
        'button.featured_world',
        '$play_button_target',
        'button.promotion_page',
        'button.navigate_carousel_left',
        'button.item_action',
        'button.item_pdp',
        'button.structure_detect',
        'button.no_interaction',
        'button.font_license_popup',
        'button.reset_to_default_progressions',
        'button.remove_progression',
        'button.clear_progression_list',
        'dev_add_mock_http_rules',
        'dev_remove_all_mock_http_rules',
        'button.add_progression_by_name',
        // +1.17
        'button.exit_verbose_state',
        'button.toggle_verbose_state',
        'button.controller_hover_open_verbose_view',
        'button.goToDownload',
        'button.debug_open_json_popup',
        'button.showEligibility',
        'button.open_demo_screen',
        'button.menu_choose_slot',
        'button.close',
        'button.retry',
        'button.service_agreement',
        'button.upload_world',
        'button.feedback',
        'button.interaction',
        'button.purchase_with_currency',
        'button.interact_button',
        'common_buttons.new_ui_form_fitting_button_panel',
        'button.purchase_with_coins',
        'toggle.skin_category_selected',
        'button.show_profile_settings',
        'button.create_on_realms_button',
        'button.cloud_upload',
        'button.view_third_party_server_offers',
        'button.menu_sign_in_to_view_realms',
        'button.portfolio_convert_left',
        'button.portfolio_convert_right',
        'button.portfolio_add_photo',
        'create_world_button',
        'button.play_realm',
        'button.edit_realm',
        'button.edit_world',
        'button.activate_world',
        'button.world_slot',
        'toggle.sidebar_option_selection',
        'button.select_nav_option',
        'button.select_screen_nav_button_option',
        'button.learn_more',
        'button.toolbox_mode',
        'button.featured_category',
        // +1.19
        'button.turn_character_select_doll',
        //
        'button.exit_gift_screen',
        'button.cycle_promotions_left',
        'button.cycle_promotions_right',
        'button.navigate_carousel_right',
        'button.menu_swap_vr_mode',
        'button.smithing_table_take_all_place_all',
        'button.smithing_table_coalesce_stack',
        'button.rtx_warning_is_hovered',
        'button.clear_selected_recipe',
        'button.menu_store_error',
        'button.color_hovered',
        'button.close_button',
        'button.exit_or_toggle',
        'button.cycle_skins_left',
        'button.cycle_skins_right',
        'button.loading_outline_unhovered',
        'slider.small_decrease',
        'slider.small_increase',
        'slider.selected',
        'slider.deselected'
      ]
    },
    'hc:collection_name': {
      type: 'string',
      enum: [
        '',
        'languages',
        'actions_collection',
        'treatment_collection',
        'feature_toggles',
        'featured_item_collection',
        'boss_bars',
        'form_buttons',
        'custom_form',
        'blocked_players_collection',
        'chat_text_grid',
        'brewing_result_items',
        'achievement_list',
        'book_pages',
        'pick_collection',
        'pick_collection_inventory',
        'owned_list',
        'unowned_list',
        'future_promo_collection',
        'past_promo_collection',
        'auto_complete',
        'font_colors',
        'realms_collection',
        'list_collection',
        'slots_collection',
        'coin_purchase_grid',
        'comment_collection',
        'content_log_message',
        'content_log_text_grid',
        'category_collection',
        'offer_collection',
        'gamepad_action_items',
        'servers_network_worlds',
        'third_party_server_network_worlds',
        'legacy_worlds',
        'container_items',
        'permissions_collection',
        'screenshotpicker_collection',
        'enchanting_input_items',
        'enchanting_lapis_items',
        'horse_equip_items',
        'crafting_input_items',
        'crafting_output_items',
        'players_collection',
        'online_friends',
        'offline_friends',
        'realms_worlds',
        'local_worlds',
        'pending_invites_collection',
        'realms_branch_collection',
        'members_collection',
        'invited_friends_collection',
        'uninvited_friends_collection',
        'ugc_items',
        'hotbar_items',
        'inventory_items',
        'realm_list',
        'world_list',
        'world_templates',
        'invalid_world_templates',
        'loading_world_templates',
        'combined_hotbar_and_inventory_items',
        'photos',
        'speed',
        'haste',
        'resist',
        'jump',
        'strength',
        'regen',
        'extra',
        'confirm',
        'cancel',
        'navigation_tabs',
        'skins_collection',
        'required_resourcepacks',
        'optional_resourcepacks',
        'screenshots_collection',
        'default_skins_collection',
        'recent_skins_collection',
        'premium_packs_collection',
        'premium_skins_collection',
        'loading_personal_realms',
        'loading_friends_realms',
        'offers_collection',
        'mob_effects_collection',
        'dependent_packs_panel',
        'dependency_panel',
        'storage_panel',
        'search_panel',
        'tag_factory_collection',
        'student_buttons_collection',
        // +0.16
        '#enchant_buttons',
        'gamepad_collection',
        'keyboard_collection',
        // +1.2
        '#suggested_offers_collection',
        // +1.3/1.4
        'feed_collection',
        'manage_feed_collection',
        'buttons',
        'friends_network_worlds',
        'cross_platform_friends_network_worlds',
        'realms_backup_collection',
        'scoreboard_scores',
        'scoreboard_players',
        'scoreboard_list_icons',
        'scoreboard_list_names',
        'scoreboard_list_scores',
        'scoreboard_list_connections',
        'scoreboard_list_bgs',
        'scoreboard_list_healths',
        'hero_row_collection',
        // +1.7
        'editor_buttons_collection',
        'hero_row_l2_collection',
        // +1.8
        'skin_pack_collection',
        'library_items',
        'pack_icons',
        // +1.9
        'unused_treatment_collection',
        '#education_template_collection',
        // +1.11
        'trade_item_1',
        'trade_item_2',
        'sell_item',
        // + 1.13
        'content_sections',
        'popular_packs_collection',
        'platform_terms_collection',
        'realms_plus_templates',
        'custom_world_templates',
        'skin_colors',
        'ratings_star_collection',
        'pack_errors',
        'error_debug',
        'online_xbox_live_friends',
        'offline_xbox_live_friends',
        'online_platform_friends',
        'offline_platform_friends',
        'recipe_book',
        'templates_collection',
        'lesson_items',
        'active_tasks',
        'lan_network_worlds',
        // +1.14
        'world_column',
        'world_row',
        'template_column',
        'template_row',
        'creation_type',
        'permission_roles',
        // + 1.15/1.16
        'button_collection',
        //
        'world_screenshot_collection',
        'gift_promotion_collection',
        'carousel_bar_collection',
        'realms_plus_subscriptions_collection',
        'additional_realms_subscriptions_collection',
        'mock_http_rules',
        'progression_collection',
        'ui_feature_toggles',
        'dev_new_achievements_screens_radio',
        'experimental_toggles',
        'controls_toggle',
        'factory_collection',
        'color_collection',
        'server_games_collection',
        'server_screenshot_collection',
        'beta_retail_local_worlds',
        'beta_retail_legacy_worlds',
        'world_slots',
        'dev_new_create_world_screen_radio',
        // Chemistry
        'output_char_collection',
        'compcreate_input',
        'labtable_input',
        'matreduce_output'
      ]
    },
    'hc:links': {
      enum: [
        '',
        'unset #hyperlink in property_bag',
        // +0.16
        'http://education.minecraft.net/eula',
        'http://pocketbeta.minecraft.net/p/how-to-join-and-leave-beta.html',
        'http://aka.ms/minecraftrealmsfb',
        'http://aka.ms/minecraftrealmsterms',
        'http://aka.ms/minecraftfb',
        'http://aka.ms/minecraftedusupport',
        'https://aka.ms/blockxboxmessages',
        'http://aka.ms/minecraftfbbeta',
        'https://minecraft.net/attribution',
        'http://aka.ms/mcedulogs',
        'https://minecraft.net/licensed-content/',
        'https://education.minecraft.net/eula',
        'https://aka.ms/mcedulogs',
        'https://aka.ms/minecraftrealmsterms',
        'https://aka.ms/minecraftfb',
        'https://aka.ms/minecraftfbbeta',
        'https://aka.ms/minecraftedusupport',
        'https://itunes.apple.com/us/app/minecraft/id479516143?mt=8',
        'https://account.xbox.com/Settings',
        // +1.8
        'https://aka.ms/meeterms',
        'https://aka.ms/privacy',
        // +1.15/1.16
        'https://aka.ms/MCBanned',
        'https://aka.ms/MCMultiplayerHelp',
        // +1.17
        'https://aka.ms/meeeula',
        'https://aka.ms/mee_privacy',
        'https://www.minecraft.net/attribution/?hideChrome',
        'https://aka.ms/switchattribution',
        'https://www.minecraft.net/licensed-content/?hideChrome',
        'https://aka.ms/switchcontent',
        'https://social.xbox.com/changegamertag'
      ]
    },
    'hc:grid_dimensions': {
      enum: [
        // +0.16
        '#achievement_grid_dimension',
        '#gamepad_action_item_grid_dimension',
        '#equip_grid_dimensions',
        '#inv_grid_dimensions',
        '#hotbar_grid_dimensions',
        '#hotbar_grid_dimensions_fixed_inventory',
        '#boss_grid_dimension',
        '#online_friend_grid_dimension',
        '#offline_friend_grid_dimension',
        '#players_grid_dimension',
        '#realms_network_world_item_grid_dimension',
        '#local_world_item_grid_dimension',
        '#required_resource_pack_grid_dimension',
        '#optional_resource_pack_grid_dimension',
        '#gamertag_item_grid_dimension',
        '#realms_branch_grid_dimension',
        '#members_grid_dimension',
        '#invited_friends_grid_dimension',
        '#uninvited_friends_grid_dimension',
        '#screenshots_grid_dimensions',
        '#skins_grid_dimensions',
        '#premium_skins_grid_dimensions',
        '#premium_packs_grid_dimensions',
        '#default_skins_grid_dimensions',
        '#recent_skins_grid_dimensions',
        '#offer_grid_dimensions',
        '#keyboard_grid_dimension',
        '#gamepad_grid_dimension',
        '#language_grid_dimension',
        '#category_grid_dimensions',
        '#realm_grid_dimension',
        '#world_grid_dimension',
        '#navigation_tab_grid_size',
        '#loading_personal_realms_grid_dimension',
        '#loading_friends_realms_grid_dimension',
        // +1.0
        '#loading_world_template_item_grid_dimension',
        '#world_template_item_grid_dimension',
        '#invalid_world_template_item_grid_dimension',
        // +1.1
        '#world_screenshots_grid_dimensions',
        '#mob_effect_grid_size',
        '#featured_item_grid_dimension',
        '#list_grid_dimensions',
        // +1.2
        '#pick_grid_dimensions',
        '#coin_offer_size',
        '#comment_grid_dimension',
        '#feed_grid_dimension',
        '#manage_feed_grid_dimension',
        '#student_button_grid_dimensions',
        '#permissions_grid_dimension',
        '#servers_network_world_item_grid_dimension',
        '#third_party_featured_item_grid_dimension',
        '#legacy_world_item_grid_dimension',
        '#blocked_players_grid_dimension',
        '#screenshotpicker_grid_dimension',
        '#past_promo_row_grid_dimension',
        '#future_promo_row_grid_dimension',
        '#suggested_offers_item_grid_dimension',
        '#treatments_grid_dimension',
        '#realms_backup_grid_dimension',
        // +1.3/1.4
        '#trending_offers_dimensions',
        '#trending_rows_dimensions',
        // +1.7
        '#editor_grid_dimensions',
        '#row_grid_dimensions',
        // +1.8
        '#font_color_grid_dimension',
        '#grid_dimensions',
        // +1.9
        '#education_template_item_grid_dimension',
        '#unused_treatments_grid_dimension',
        // +1.12
        '#realms_grid_dimension',
        // +1.13
        '#templates_grid_dimension',
        '#online_xbox_live_friend_grid_dimension',
        '#offline_xbox_live_friend_grid_dimension',
        '#online_platform_friend_grid_dimension',
        '#offline_platform_friend_grid_dimension',
        '#ratings_star_dimensions',
        '#color_single_page_size',
        '#cape_count',
        '#realms_plus_template_item_grid_dimension',
        '#custom_world_template_item_grid_dimension',
        // +1.14
        '#online_linked_account_friend_grid_dimension',
        '#offline_linked_account_friend_grid_dimension',
        // +1.15/1.16
        '#beta_retail_local_world_item_grid_dimension',
        '#beta_retail_legacy_world_item_grid_dimension',
        '#progressions_grid_dimension',
        '#dev_new_achievements_screens_radio_dimension'
      ]
    },
    'hc:textbox_name': {
      enum: [
        // +0.16
        'player_name_text_box',
        'dev_realms_endpoint',
        'dev_realms_endpoint_payment',
        'dev_realms_relying_party',
        'dev_realms_relying_party_payment',
        'realm_name_text_box',
        'world_name_text_box',
        'world_seed_text_box',
        '#name_text_box',
        '#ip_text_box',
        '#port_text_box',
        '#message_text_box',
        '#url_text_box',
        '#interact_text_box',
        '#text_box_photos',
        '#realms_name_box',
        '#version_filter_text_box',
        // +1.0
        '#text_box_structure_offset_x',
        '#text_box_structure_offset_y',
        '#text_box_structure_offset_z',
        '#text_box_structure_size_x',
        '#text_box_structure_size_y',
        '#text_box_structure_size_z',
        '#text_box_structure_seed',
        '#text_box_structure_integrity',
        '#text_box_structure_name',
        '#text_box_metadata_name',
        '#search_box_name',
        // +1.1
        'command_block.hover_note_textbox',
        'command_block.output_text',
        'command_block.command_text',
        '#remix_name',
        '#remix_description',
        '#remix_tag',
        '#remix_minecraft_tag',
        '#sign_text_multi',
        'search_control',
        'structure_name',
        '#structure_name',
        // +1.2
        '#page_text_box',
        '#title_text_box',
        '#author_text_box',
        'comment_text_box',
        'action_text_box',
        'maximized_action_edit_box',
        'button_name_edit',
        '#join_by_code_text_edit',
        '#player_filter_text_box',
        '#caption_text_box',
        'custom_input',
        'gamertag_search_box',
        'report_reason_text_box',
        'club_description_text_box',
        'dev_date_year_override_text_box',
        'dev_date_month_override_text_box',
        'dev_date_day_override_text_box',
        'dev_override_day_length_text_box',
        'dev_treatment_id',
        // +1.3/1.4
        'share_text_box',
        'search_text_box',
        'student_message_bubble',
        // +1.6
        'automation_functional_test_tags',
        'automation_unit_test_tags',
        'automation_functional_blacklist_test_tags',
        'automation_unit_blacklist_test_tags',
        'automation_repeat_count',
        'automation_ingestion_endpoint',
        'automation_testrun_id',
        // +1.8
        'random_tick_speed_text_box',
        'dev_override_time_scale_text_box',
        // +1.10
        'search_filter_text',
        'dev_date_hour_override_text_box',
        'dev_date_minute_override_text_box',
        // +1.11
        'dev_version_major_override_text_box',
        'dev_version_minor_override_text_box',
        'dev_version_patch_override_text_box',
        // +1.12
        'debug_state_text_box',
        'command_block.tick_delay_textbox',
        '#integrity_field',
        '#seed_field',
        '#data_field',
        'template_version_text_box',
        'leak_memory_text_box',
        // +1.13
        '#template_search_box',
        '#world_search_box',
        'respawn_radius_text_box',
        // +1.15/1.16
        'test_assets.azure_shared_access_signature',
        'automation_server_test_tags',
        'automation_broken_functional_test_tags',
        'automation_broken_server_test_tags',
        'automation_broken_unit_test_tags',
        'automation_soak_test_duration_minutes',
        'dev_progression_id',
        // +1.17
        '#animation_time_field'
      ]
    },
    'hc:slider_name': {
      enum: [
        // +0.16
        'keyboard_mouse_sensitivity',
        'vr_ui_mouse_sensitivity',
        'controller_sensitivity',
        'vr_sensitivity',
        'vr_roll_turn_sensitivity',
        'touch_sensitivity',
        'button_size',
        'gui_scale',
        'gamma',
        'vr_gamma',
        'field_of_view',
        'render_distance',
        'vr_render_distance',
        'msaa',
        'vr_msaa',
        'particle_render_distance',
        'vr_particle_render_distance',
        'master_volume',
        'music_volume',
        'sound_volume',
        'weather_volume',
        'hostile_creature_volume',
        'player_volume',
        'jukebox_and_note_block_volume',
        'block_volume',
        'friendly_creature_volume',
        'environment_volume',
        'dev_connection_quality',
        // +1.0
        'max_framerate',
        // +1.1
        'safe_zone',
        // +1.2
        'safe_zone_all',
        'safe_zone_x',
        'safe_zone_y',
        'screen_position_x',
        'screen_position_y',
        'custom_slider_step',
        'custom_slider',
        'gamepad_cursor_sensitivity',
        'server_sim_distance',
        'dev_render_attach_pos',
        'splitscreen_interface_opacity',
        'interface_opacity',
        'mem_check_timer',
        // +1.3/1.4
        'hdr_calibration',
        'content_tier_slider',
        'keyboard_smooth_rotation_speed',
        'rendering_profile',
        // +1.7
        'chat_message_spacing',
        // +1.9
        'chat_line_spacing',
        // +1.10
        'chat_font_size',
        // +1.12
        'rotation',
        'mirror',
        // +1.13
        'ad_token_refresh_threshold',
        // +1.14
        'gfx_texture_load_delay',
        'gfx_max_dequeued_textures_per_frame',
        // +1.15/1.16
        'raytracing_render_distance',
        'vr_snap_angle',
        'vr_hud_distance',
        'texttospeech_volume',
        'text_background_opacity',
        'main_volume',
        'ambient_volume',
        'hostile_volume',
        'neutral_volume',
        'record_volume'
      ]
    },
    'hc:toggle_name': {
      enum: [
        // +0.16
        'keyboard_mouse_invert_y_axis',
        'keyboard_mouse_autojump',
        'keyboard_mouse_toggle_crouch',
        'controller_invert_y_axis',
        'controller_autojump',
        'vr_autojump',
        'controller_toggle_crouch',
        'controller_vibration',
        'touch_invert_y_axis',
        'touch_autojump',
        'touch_vibration',
        'touch_toggle_crouch',
        'split_controls',
        'left_handed',
        'swap_jump_and_sneak',
        'allow_cheats',
        'navigation_tab',
        'allow_cellular_data',
        'advanced_video_options_toggle',
        'full_screen',
        'view_bobbing',
        'graphics_toggle',
        'fancy_skies',
        'transparent_leaves',
        'hide_gui',
        'vr_hide_gui',
        'texel_aa',
        'vr_3d_rendering',
        'vr_mirror_texture',
        'limit_world_size',
        'comfort_controls',
        'show_comfort_select_screen',
        'vr_living_room_cursor_centered',
        'vr_hmd_displacement',
        'vr_linear_jump',
        'vr_linear_motion',
        'sticky_mining',
        'vr_hud_drifts',
        'vr_head_steering',
        'stutter_turn',
        'stutter_constant_angle_or_time',
        'stutter_turn_sound',
        'vr_roll_turn',
        'languages',
        'dev_enable_debug_ui',
        'dev_offers_unlocked',
        'dev_render_bounding_box',
        'dev_render_paths',
        'dev_render_goal_state',
        'dev_reset_client_id',
        'dev_show_chunk_map',
        'dev_enable_profiler',
        'dev_achievements_always_enabled',
        'dev_use_local_server',
        'dev_use_ipv6_only',
        'dev_use_fps_independent_turning',
        'dev_use_retail_xbox_sandbox',
        'dev_create_realm_without_purchase',
        'always_day',
        'multiplayer_game',
        'xboxlive_visible',
        'server_visible',
        'speed',
        'haste',
        'resist',
        'jump',
        'strength',
        'regen',
        'extra',
        'confirm',
        'cancel',
        'toggle_invite_online',
        'toggle_invite_offline',
        'required_resourcepacks',
        'optional_resourcepacks',
        '#player_count_2',
        '#player_count_10',
        '#agree_terms_and_conditions',
        '#hide_invites',
        '#operator',
        '#member_settings',
        'force_user_agreement_level',
        'third_person_dropdown',
        'dev_realms_environment_dropdown',
        'realms_difficulty',
        'realms_gamemode',
        'world_game_mode_dropdown',
        'player_game_mode_dropdown',
        'world_difficulty_dropdown',
        'world_type_dropdown',
        // +1.0
        'world_toggle',
        'advanced_video_options',
        'ui_profile_dropdown',
        'sticky_mining_hand',
        'vr_hand_controls_item',
        'vr_hand_controls_hud',
        'vr_hand_pointer',
        'vr_hands_visible',
        'enable_chat_text_to_speech',
        'dev_debug_hud_dropdown',
        // +1.1
        'track_output',
        'redstone_dropdown',
        'condition_dropdown',
        'block_type_dropdown',
        'horse_interactive_tabs',
        'switch_storage_type',
        'local_copy_toggle',
        'toggle.enableMultiselect',
        '#invisible_blocks_toggle',
        '#include_entities_toggle',
        '#include_players_toggle',
        '#remove_blocks_toggle',
        'mode_dropdown',
        'dev_show_build_info',
        'smooth_lighting',
        'file_storage_location',
        'websocket_encryption',
        // +1.2
        'hide_chat',
        'right_inventory_navigation_tab',
        'layout_toggle',
        'toggle.enableFiltering',
        'button_mode_toggle',
        'rating_dropdown',
        '#selected_duration_short',
        '#selected_duration_long',
        '#custom_dropdown_radio_toggle',
        '#custom_dropdown',
        'custom_toggle',
        'custom_dropdown',
        'custom_dropdown_radio_toggle',
        'report_reason_dropdown',
        'add_friend_dropdown',
        'mute_player',
        'block_player',
        'hide_tooltips',
        'hide_gamepad_cursor',
        'start_with_map',
        'bonus_chest',
        'show_coordinates',
        'fire_spreads',
        'tnt_explodes',
        'mob_loot',
        'natural_regeneration',
        'tile_drops',
        'daylight_cycle',
        'keep_inventory',
        'mob_spawn',
        'mob_griefing',
        'entities_drop_loot',
        'weather_cycle',
        'classroom_settings',
        'perfect_weather',
        'allow_mobs',
        'allow_destructive_items',
        'player_damage',
        'immutable_world',
        'pvp_damage',
        'player_permissions_dropdown',
        'xbl_broadcast_dropdown',
        'dev_assertions_debug_break',
        'dev_mce_assertions_debug_break_hack',
        'dev_show_dev_console_button',
        'dev_enable_mixer_interactive',
        'dev_show_tcui_replacement',
        'show_auto_save_icon',
        'hide_hand',
        'hide_paperdoll',
        'classic_box_selection',
        'vr_classic_box_selection',
        'ingame_player_names',
        'splitscreen_ingame_player_names',
        'vr_hide_hud',
        'vr_hide_hand',
        'field_of_view_toggle',
        'dev_display_override_datetime',
        'dev_save_current_override_date',
        'dev_show_override_treatments',
        'feature_toggle',
        'dev_server_instance_thread',
        'dev_find_mobs',
        'split_screen_dropdown',
        'vr_smooth_lighting',
        'render_clouds',
        'vr_transparent_leaves',
        'hide_hud',
        'dev_use_zipped_in_package_packs',
        'dev_import_packs_as_zip',
        'dev_use_override_date',
        'dev_display_treatments_panel',
        'dev_new_culler',
        // +1.3/1.4
        'locked_toggle',
        'option_toggle',
        'player_toggle',
        'permission_level_dropdown',
        'hotbar_only_touch',
        'swap_gamepad_ab_buttons',
        'swap_gamepad_xy_buttons',
        'keyboard_show_full_keyboard_options',
        'pvp',
        'experimental_gameplay',
        'education_toggle',
        'platform_broadcast_dropdown',
        'auto_update_mode_dropdown',
        'auto_update_enabled',
        'screen_animations',
        'atmospherics',
        'edge_highlight',
        'bloom',
        'terrain_shadows',
        'super_fancy_water',
        'dev_xforge_requests_require_sign_in',
        'multithreaded_rendering',
        'switch_coin_debug',
        // +1.5
        'dev_connection_quality',
        'bubble_particles',
        // +1.6
        'realm_default_permission_dropdown',
        'automation_functional_test_block_input',
        'dev_assertions_show_dialog',
        // +1.7
        'code_builder',
        'command_blocks_enabled',
        // +1.8
        'font_color_toggle',
        'hide_keyboard_tooltips',
        'dev_show_latency_graph',
        'dev_newParticleSystem',
        // +1.9
        'vsync_dropdown',
        'file_watcher',
        'dev_game_tip',
        'dev_show_server_chunk_map',
        'content_log',
        'content_log_gui',
        'doimmediaterespawn',
        // +1.10
        'chat_typeface_dropdown',
        'left_navigation_tab',
        'right_navigation_tab',
        'dev_identity_env_dropdown',
        'content_log_file',
        'windows_store_dropdown',
        'timezonetype_dropdown',
        'dev_load_override_date',
        // +1.11
        'trade_toggle',
        'dev_use_version_override',
        'perf_turtle',
        'enable_ui_text_to_speech',
        // +1.12
        'execute_on_first_tick',
        'dev_force_client_blob_cache',
        'dev_disable_client_blob_cache',
        'show_ad_debug_panel_button',
        'dev_show_doc_id',
        // +1.13
        'toggle_tts',
        '#show_bounding_box_toggle',
        'mirror_x',
        'mirror_z',
        'enable_auto_text_to_speech',
        'enable_open_chat_message',
        'automation_repeat_failures_only',
        'dev_toggle_default_font_overrides',
        'dev_disable_render_terrain',
        'dev_disable_render_entities',
        'dev_disable_render_blockentities',
        'dev_disable_render_particles',
        'dev_disable_render_sky',
        'dev_disable_render_weather',
        'dev_disable_render_hud',
        'dev_disable_render_item_in_hand',
        'async_texture_loads',
        'async_missing_texture',
        'ad_use_single_sign_on',
        // +1.14
        'confirm_0',
        'confirm_1',
        'confirm_2',
        'confirm_3',
        'toggle_xbox_live_invite_online',
        'toggle_xbox_live_invite_offline',
        'toggle_platform_invite_online',
        'toggle_platform_invite_offline',
        'toggle_linked_account_invite_online',
        'toggle_linked_account_invite_offline',
        'online_safety_do_not_show_again',
        'only_trusted_skins_allowed',
        'crossplatform_toggle',
        // +1.15/1.16
        'toggle.joint_type_toggle',
        'sunsetting_do_not_show_again',
        'server_navigation_toggle',
        'dev_display_progressions_panel',
        'dev_new_achievements_screens_radio',
        'ui_feature_toggle',
        'dev_sunsetting_tier_dropdown',
        'dev_use_sunset_overrides',
        'dev_sunset_state',
        'dev_discovery_environment_dropdown',
        'enable_texture_hot_reloader',
        'dev_edu_demo',
        'dev_render_mob_info_state',
        'remote_imgui',
        'automation_soak_test_duration_minutes',
        'automation_broken_unit_test_tags',
        'camera_shake',
        'graphics_upscaling',
        'raytracing',
        'vr_camera_movement_dropdown',
        'vr_variable_snap_angle',
        'vr_movement_dropdown',
        'vr_jump_dropdown',
        'vr_head_steering_dropdown',
        'vr_sticky_mining_dropdown',
        'vr_hud_position_dropdown',
        'vr_snap_angle',
        'vr_snap_sound',
        'dev_override_xbox_sandbox',
        'dev_xbox_environment_dropdown',
        'dev_show_override_progressions',
        'dev_display_mock_http_panel',
        'cloud_upload_terms_accepted',
        // +1.17
        'on_enter_toggle',
        'on_exit_toggle',
        'toggle.skin_pack_category',
        'toggle.category_selected',
        'toggle.sidebar_verbose_toggle',
        'toggle.sidebar_option_dropdown',
        'animation_mode_dropdown'
      ]
    },
    'hc:bag_binding': {
      enum: [
        '#visible',
        '#text',
        '#enabled',
        '#grayscale',
        '#texture',
        '#texture_file_system',
        '#clip_ratio',
        // "#hover_text",
        '#toggle_state',
        '#focus_change_up',
        '#focus_change_down',
        '#focus_change_left',
        '#focus_change_right',
        '#focus_identifier',
        '#item_id_aux',
        '#disabled_filter_visible',
        '#maximum_grid_items',
        '#default_focus_precedence',
        '#label_text',
        '#button_navigation',
        '#font_type',
        '#color',
        '#propagateAlpha',
        '#banner_patterns',
        '#banner_colors',
        '#ip',
        '#progress_label',
        '#progress_bar_total_amount',
        '#progress_bar_current_amount',
        '#progress_bar_visible',
        '#bilinear',
        '#modal',
        // "#inventory_stack_count",
        '#always_handle_controller_direction',
        '#focus_enabled',
        '#slider_steps',
        '#slider_value',
        '#item_name',
        '#can_be_deselected',
        '#charged_item',
        '#item_custom_color',
        '#banner_type',
        '#alpha',
        '#toggle_on_hover',
        '#anchored_offset_value_x',
        '#anchored_offset_value_y',
        '#coins_text',
        '#collection_length',
        '#zip_folder',
        '#anchored_offset_value',
        '#no_xbl_icon_visible',
        '#is_hero_author_visible',
        '#hero_offer_markdown_visible',
        '#hero_progress_visible',
        '#hero_offer_download_progress_label',
        '#offer_markdown_percentage',
        '#offer_markdown_visible',
        '#hero_offer_markdown_percentage',
        '#offer_full_price',
        '#offer_strikethrough_price_visible',
        '#is_collection_query_on_sale',
        '#show_sales_banner',
        '#time_remaining_label',
        '#show_sales_timer',
        '#hyperlink',
        '#seach_results_close_button_visible'
      ]
    },
    'hc:binding': {
      enum: [
        // +0.16
        '#gamerscore_value',
        '#achievements_value',
        '#time_played_value',
        '#achievement_percentage',
        '#achievement_grid_dimension',
        '#is_gamepad',
        '#is_locked',
        '#is_unlocked',
        '#achievement_name',
        '#texture_name',
        '#grayscale_texture',
        '#texture_locationtype',
        '#achievement_description',
        '#achievement_gamer_score',
        '#achievement_world_score',
        '#trophy_progress_percentage',
        '#progress_percentage',
        '#play_button_enabled',
        '#play_button_disabled',
        '#save_button_enabled',
        '#save_button_disabled',
        '#title_text',
        '#cross_out_icon',
        '#cost_text',
        '#cost_text_red',
        '#cost_text_green',
        '#collection_total_items',
        '#inventory_focused',
        '#slots_focused',
        '#button_text',
        '#button_visible',
        '#authentication_message',
        '#eula_clickable',
        '#popup_text',
        '#popup_message_student_visible',
        '#hyperlink_prompt_text',
        '#gamepad_helper_visible',
        '#selected',
        '#extra_image_selection',
        '#active',
        '#button_hover',
        '#empty_bottle_image_visible',
        '#brewing_bubbles_ratio',
        '#brewing_arrow_ratio',
        '#keyboard_not_being_used',
        '#keyboard_being_used',
        '#send_button_visible',
        '#buttons_visible',
        '#chat_visible',
        '#auto_complete_item',
        '#auto_complete_text',
        '#get_grid_size',
        '#disconnect_text',
        '#show_selected_button_highlight',
        '#active_enchant',
        '#input_item_id',
        '#inactive_enchant',
        '#output_item_id',
        '#enchant_hint',
        '#open',
        '#player_level_color',
        '#player_level_info',
        '#runes',
        '#cost',
        '#single_label_visible',
        '#dual_label_visible',
        '#upload_content_visible',
        '#warning_content_visible',
        '#play_button_visible',
        '#cancel_button_visible',
        '#warning_button2_visible',
        '#output_name',
        '#output_names',
        '#output_id',
        '#furnace_arrow_ratio',
        '#furnace_flame_ratio',
        '#gamepad_action_item_grid_dimension',
        '#root_visible',
        '#cda_visible',
        '#binding_state',
        '#action',
        '#binding',
        '#confirmation',
        '#entity_id',
        '#equip_grid_dimensions',
        '#sadle_slot_centered',
        '#has_armor_slot',
        '#is_chested',
        '#horse_name_loc',
        '#inv_grid_dimensions',
        '#is_not_creative_mode',
        '#is_creative_mode',
        '#level_number',
        '#level_number_visible',
        '#inventory_touch_button',
        '#exp_progress',
        '#slot_selected',
        '#chat_text',
        '#inventory_stack_count',
        '#stack_count_visible',
        '#is_not_riding',
        '#is_riding',
        '#hud_visible_centered',
        '#hud_visible_not_centered',
        '#hotbar_elipses_right_visible',
        '#hotbar_elipses_left_visible',
        '#hotbar_grid_dimensions',
        '#edu_hotbar_fixed_inventory_visible',
        '#hotbar_grid_dimensions_fixed_inventory',
        '#item_text',
        '#tip_text',
        '#bossName',
        '#bar_visible',
        '#player_position_visible',
        '#player_position_text',
        '#hud_visible_centered_ridingvr',
        '#vr_riding',
        '#boss_hud_padding',
        '#hud_visible',
        '#empty_armor_image_visible',
        '#online_visible',
        '#offline_visible',
        '#label_line1',
        '#label_line2',
        '#online_friend_grid_dimension',
        '#offline_friend_grid_dimension',
        '#online_friends_visible',
        '#offline_friends_visible',
        '#no_friends_visible',
        '#preview_skin',
        '#achievements_visible',
        '#invite_button_visible',
        '#is_trial_version',
        '#is_full_version',
        '#ip_address_visible',
        '#ip_address_text',
        '#players_grid_dimension',
        '#button_enabled',
        '#button_disabled',
        '#local_icon_visible',
        '#texture_source',
        '#gamerpic_visible',
        '#gamertag',
        '#realms_not_available_text',
        '#realms_not_available_text_visible',
        '#realms_new_realm_visible',
        '#realms_xbox_live_signin_visible',
        '#realms_check_store_visible',
        '#realms_world_header',
        '#realms_world_details',
        '#realms_world_player_count',
        '#realms_edit_visible',
        '#realms_info_visible',
        '#realms_network_world_item_grid_dimension',
        '#network_world_header',
        '#network_world_details',
        '#network_world_player_count',
        '#game_online',
        '#game_unavailable',
        '#game_offline',
        '#local_world_name',
        '#local_world_game_mode',
        '#local_world_date',
        '#local_worldfile_size',
        '#local_and_cloud_storage_visible',
        '#cloud_only_storage_visible',
        '#local_world_item_grid_dimension',
        '#realms_notification_count',
        '#no_local_worlds',
        '#friends_grid_visible',
        '#no_friends_grid_visible',
        '#multiplayer_privileges_blocked_visible',
        '#lan_grid_visible',
        '#servers_grid_visible',
        '#realms_world_list_visible',
        '#realms_information_panel_visible',
        '#realms_not_available_content',
        '#realms_outdated_panel_visible',
        '#local_only_storage_visible',
        '#screenshot_path',
        '#trash_visibility_left',
        '#trash_visibility_right',
        '#photo_page_item_name_left',
        '#photo_page_item_name_right',
        '#photo_visibility',
        '#page_prev_visibility',
        '#page_next_visibility',
        '#export_visibility',
        '#selectedPacks',
        '#selectedPackSize',
        '#required_resource_pack_grid_dimension',
        '#optional_resource_pack_grid_dimension',
        '#progress_text',
        '#bar_animation_visible',
        '#loading_bar_visible',
        '#loading_bar_total_amount',
        '#loading_bar_current_amount',
        '#cancel_visible',
        '#cancel_not_visible',
        '#pending_invites_visible',
        '#response_buttons_visible',
        '#realm_name',
        '#realm_owner',
        '#accept_panel_visible',
        '#invite_status',
        '#gamertag_item_grid_dimension',
        '#no_invites_visible',
        '#realm_subscription_origin_visibility',
        '#manage_subscription_button_visible',
        '#renew_subscription_button_visible',
        '#extend_consumable_button_visible',
        '#renew_consumable_button_visible',
        '#open_realm_button_visible',
        '#close_realm_button_visible',
        '#realms_subscription_loading_message_visible',
        '#realms_subscription_info_visible',
        '#branch_name',
        '#commit_id',
        '#realms_branch_grid_dimension',
        '#selected_branch_commit_id',
        '#prev_button_visible',
        '#page_index_text',
        '#next_button_visible',
        '#disabled_play_button_visible',
        '#is_realm_expired',
        '#invite_friends_visible',
        '#members_visible',
        '#members_grid_dimension',
        '#invited_friends_grid_dimension',
        '#uninvited_friends_visible',
        '#uninvited_friends_grid_dimension',
        '#loading_friends',
        '#player_not_removed',
        '#real_name',
        '#show_member_settings',
        '#player_status_visible',
        '#undo_action_visible',
        // "#texture",
        // "#texture_file_system",
        '#player_online',
        '#player_offline',
        '#pending_invite_left',
        '#pending_invite_right',
        '#plus_button_visible',
        '#screenshot_texture_name',
        '#screenshot_texture_file_system',
        '#screenshots_grid_dimensions',
        '#zoomed_texture_name',
        '#zoomed_texture_file_system',
        '#unlock_button_visible',
        '#create_world_button_visible',
        '#icon_path',
        '#icon_zip',
        '#icon_file_system',
        '#is_premium_unlocked',
        '#is_premium_locked',
        '#show_description',
        '#direction_button_visible',
        '#description',
        '#name',
        '#size',
        '#is_selected',
        '#skin_index',
        '#skin_lock_visible',
        '#skins_grid_dimensions',
        '#skin_name',
        '#show_reload_custom_skin_button',
        '#show_preview_skin_lock',
        '#show_pack_locked',
        '#show_pack_unlocked',
        '#premium_skins_grid_dimensions',
        '#pack_name',
        '#show_new_pack_icon',
        '#cycle_pack_left_button_visible',
        '#premium_packs_grid_dimensions',
        '#default_skins_grid_dimensions',
        '#recent_skins_grid_dimensions',
        '#development_version',
        '#version',
        '#playername',
        '#feedback_visible',
        '#sign_in_visible',
        '#signingin_visible',
        '#signingin_text',
        '#new_offers',
        '#trial_game_mode',
        '#realms_notification_visible',
        '#featured_texture_path',
        '#featured_texture_file_system',
        '#new_featured_offer',
        '#featured_title',
        '#featured_desc',
        '#featured_price',
        '#offer_texture_name',
        '#offer_texture_file_system',
        '#new_offer',
        '#valid_offer_index',
        '#offer_grid_dimensions',
        '#offer_category_name',
        '#category_grid_dimensions',
        '#is_resource_pack',
        '#is_achievement',
        '#is_invite',
        '#toast_title',
        '#toast_subtitle',
        '#keyboard_helper_visible',
        '#item_durability_visible',
        '#item_durability_total_amount',
        '#item_durability_current_amount',
        '#selected_item_durability_visible',
        '#selected_item_durability_total_amount',
        '#selected_item_durability_current_amount',
        '#gesture_control_enabled',
        '#show_hovered_selected_inventory_slot',
        '#show_selected_slot',
        '#show_hovered_selected_slot',
        '#start_selected',
        '#inventory_selected_item_stack_count',
        '#inventory_selected_item',
        '#inventory_selected_item_color',
        '#message',
        '#title',
        '#binding_button_text',
        '#keymapping_name',
        '#vr_roll_turn_sensitivity_visible',
        '#keyboard_grid_dimension',
        '#gamepad_grid_dimension',
        '#not_logged_in',
        '#logged_in',
        '#show_msaa',
        '#show_vr_msaa',
        '#show_texel_aa',
        '#device_has_positional_tracking',
        '#language_grid_dimension',
        '#dev_realms_environment_radio_local',
        '#download_button_enabled',
        '#upload_button_enabled',
        '#reset_button_enabled',
        '#reset_button_visible',
        '#section_title',
        '#dialog_title',
        '#achievment_warning_visible',
        '#player_game_mode_dropdown_visible',
        '#show_world_type_options',
        '#show_convert_to_infinite_button',
        '#can_be_xboxlive_visible',
        '#can_be_server_visible',
        '#keyboard_mouse_sensitivity',
        '#vr_ui_mouse_sensitivity',
        '#controller_sensitivity',
        '#vr_sensitivity',
        '#vr_roll_turn_sensitivity',
        '#touch_sensitivity',
        '#button_size',
        '#keyboard_mouse_sensitivity_enabled',
        '#vr_ui_mouse_sensitivity_enabled',
        '#keyboard_mouse_invert_y_axis_enabled',
        '#keyboard_mouse_autojump_enabled',
        '#keyboard_mouse_toggle_crouch_enabled',
        '#controller_sensitivity_enabled',
        '#vr_sensitivity_enabled',
        '#vr_roll_turn_sensitivity_enabled',
        '#controller_invert_y_axis_enabled',
        '#controller_autojump_enabled',
        '#vr_autojump_enabled',
        '#controller_toggle_crouch_enabled',
        '#controller_vibration_enabled',
        '#touch_sensitivity_enabled',
        '#touch_invert_y_axis_enabled',
        '#touch_autojump_enabled',
        '#touch_vibration_enabled',
        '#touch_toggle_crouch_enabled',
        '#split_controls_enabled',
        '#left_handed_enabled',
        '#swap_jump_and_sneak_enabled',
        '#button_size_enabled',
        '#keyboard_mouse_invert_y_axis',
        '#keyboard_mouse_autojump',
        '#keyboard_mouse_toggle_crouch',
        '#controller_invert_y_axis',
        '#controller_autojump',
        '#vr_autojump',
        '#controller_toggle_crouch',
        '#controller_vibration',
        '#touch_invert_y_axis',
        '#touch_autojump',
        '#touch_vibration',
        '#touch_toggle_crouch',
        '#split_controls',
        '#left_handed',
        '#swap_jump_and_sneak',
        '#allow_cellular_data',
        '#player_name',
        '#full_screen',
        '#view_bobbing',
        '#graphics_toggle',
        '#fancy_skies',
        '#transparent_leaves',
        '#hide_gui',
        '#vr_hide_gui',
        '#texel_aa',
        '#vr_3d_rendering',
        '#vr_mirror_texture',
        '#limit_world_size',
        '#comfort_controls',
        '#show_comfort_select_screen',
        '#vr_living_room_cursor_centered',
        '#vr_hmd_displacement',
        '#vr_linear_jump',
        '#vr_linear_motion',
        '#sticky_mining',
        '#vr_hud_drifts',
        '#vr_head_steering',
        '#stutter_turn',
        '#stutter_constant_angle_or_time',
        '#stutter_turn_sound',
        '#vr_roll_turn',
        '#dev_enable_debug_ui',
        '#dev_offers_unlocked',
        '#dev_render_bounding_box',
        '#dev_render_paths',
        '#dev_render_goal_state',
        '#dev_reset_client_id',
        '#dev_show_chunk_map',
        '#dev_enable_profiler',
        '#dev_achievements_always_enabled',
        '#dev_use_local_server',
        '#dev_use_ipv6_only',
        '#dev_use_fps_independent_turning',
        '#dev_use_retail_xbox_sandbox',
        '#dev_create_realm_without_purchase',
        '#dev_realms_endpoint',
        '#dev_realms_endpoint_payment',
        '#dev_realms_relying_party',
        '#dev_realms_relying_party_payment',
        '#allow_cellular_data_enabled',
        '#player_name_enabled',
        '#full_screen_enabled',
        '#gui_scale_enabled',
        '#gamma_enabled',
        '#vr_gamma_enabled',
        '#third_person_dropdown_enabled',
        '#view_bobbing_enabled',
        '#graphics_toggle_enabled',
        '#fancy_skies_enabled',
        '#transparent_leaves_enabled',
        '#hide_gui_enabled',
        '#vr_hide_gui_enabled',
        '#field_of_view_enabled',
        '#render_distance_enabled',
        '#vr_render_distance_enabled',
        '#msaa_enabled',
        '#vr_msaa_enabled',
        '#texel_aa_enabled',
        '#particle_render_distance_enabled',
        '#vr_particle_render_distance_enabled',
        '#vr_3d_rendering_enabled',
        '#vr_mirror_texture_enabled',
        '#limit_world_size_enabled',
        '#comfort_controls_enabled',
        '#show_comfort_select_screen_enabled',
        '#vr_living_room_cursor_centered_enabled',
        '#vr_hmd_displacement_enabled',
        '#vr_linear_jump_enabled',
        '#vr_linear_motion_enabled',
        '#sticky_mining_enabled',
        '#vr_hud_drifts_enabled',
        '#vr_head_steering_enabled',
        '#stutter_turn_enabled',
        '#stutter_constant_angle_or_time_enabled',
        '#stutter_turn_sound_enabled',
        '#vr_roll_turn_enabled',
        '#master_volume_enabled',
        '#music_volume_enabled',
        '#sound_volume_enabled',
        '#weather_volume_enabled',
        '#hostile_creature_volume_enabled',
        '#player_volume_enabled',
        '#jukebox_and_note_block_volume_enabled',
        '#block_volume_enabled',
        '#friendly_creature_volume_enabled',
        '#environment_volume_enabled',
        '#dev_enable_debug_ui_enabled',
        '#dev_offers_unlocked_enabled',
        '#dev_render_bounding_box_enabled',
        '#dev_render_paths_enabled',
        '#dev_render_goal_state_enabled',
        '#dev_reset_client_id_enabled',
        '#dev_show_chunk_map_enabled',
        '#dev_enable_profiler_enabled',
        '#dev_achievements_always_enabled_enabled',
        '#dev_use_local_server_enabled',
        '#dev_use_ipv6_only_enabled',
        '#dev_use_fps_independent_turning_enabled',
        '#dev_connection_quality_enabled',
        '#dev_use_retail_xbox_sandbox_enabled',
        '#dev_create_realm_without_purchase_enabled',
        '#dev_realms_environment_dropdown_enabled',
        '#dev_realms_endpoint_enabled',
        '#dev_realms_endpoint_payment_enabled',
        '#dev_realms_relying_party_enabled',
        '#dev_realms_relying_party_payment_enabled',
        '#gui_scale',
        '#gamma',
        '#vr_gamma',
        '#field_of_view',
        '#render_distance',
        '#vr_render_distance',
        '#msaa',
        '#vr_msaa',
        '#particle_render_distance',
        '#vr_particle_render_distance',
        '#master_volume',
        '#music_volume',
        '#sound_volume',
        '#weather_volume',
        '#hostile_creature_volume',
        '#player_volume',
        '#jukebox_and_note_block_volume',
        '#block_volume',
        '#friendly_creature_volume',
        '#environment_volume',
        '#dev_connection_quality',
        '#selected_pack_items_global',
        '#available_pack_items_global',
        '#selected_grid_dimensions_global',
        '#available_grid_dimensions_global',
        '#default_item_texture_global',
        '#default_item_file_system_global',
        '#total_size_binding_global',
        '#allow_cheats',
        '#allow_cheats_enabled',
        '#world_name',
        '#world_name_enabled',
        '#world_game_mode_dropdown_enabled',
        '#world_difficulty_dropdown_enabled',
        '#player_game_mode_dropdown_enabled',
        '#always_day',
        '#always_day_enabled',
        '#world_seed',
        '#world_seed_enabled',
        '#world_type_dropdown_enabled',
        '#multiplayer_game',
        '#multiplayer_game_enabled',
        '#xboxlive_visible',
        '#xboxlive_visibility_enabled',
        '#server_visible',
        '#server_visibility_enabled',
        '#player_count_2',
        '#player_count_10',
        // +1.0
        '#world_texture_name',
        '#world_texture_locationtype',
        '#realm_button_text',
        '#realm_trial_available',
        '#realm_grid_dimension',
        '#templates_visible',
        '#dark_banner_visible',
        '#grey_banner_visible',
        '#upsell_text',
        '#world_grid_dimension',
        '#skip_button_visible',
        '#vr_non_riding',
        '#pack_header_size_visible',
        '#clipboard_visible',
        '#refresh_visible',
        '#delete_visible',
        '#error_content_label',
        '#pack_type_label',
        '#mashup_key_art_texture',
        '#mashup_key_art_file_system',
        '#panorama_texture',
        '#panorama_texture_file_system',
        '#panorama_view',
        '#navigation_tab_icon',
        '#mashup_locked',
        '#navigation_tab_grid_size',
        '#patch_description',
        '#main_image_texture',
        '#main_image_texture_source',
        '#store_image_texture',
        '#store_image_texture_source',
        '#realms_game_online',
        '#realms_game_unavailable',
        '#realms_game_offline',
        '#leave_realm_button_visible',
        '#realms_grids_visible',
        '#realms_notification_button_invisible',
        '#realms_notification_button_visible',
        '#realm_label_visible',
        '#loading_personal_realms_grid_dimension',
        '#realms_loading_display_message',
        '#loading_personal_realms_grid_visible',
        '#realm_trial_button_visible',
        '#local_worlds_visible',
        '#loading_bars_animation_visible',
        '#friends_realms_visible',
        '#loading_friends_realms_grid_dimension',
        '#loading_friends_realms_grid_visible',
        '#no_friends_realms_visible',
        '#members_list_enabled',
        '#resource_pack_description',
        '#activate_pack_button_visible',
        '#path_to_key_art',
        '#key_art_file_system',
        '#progress_visible',
        '#offer_debug_text',
        '#offer_debug_visible',
        '#text_box_structure_offset_x',
        '#text_box_structure_offset_y',
        '#text_box_structure_offset_z',
        '#text_box_structure_size_x',
        '#text_box_structure_size_y',
        '#text_box_structure_size_z',
        '#text_box_structure_seed',
        '#text_box_structure_integrity',
        '#text_box_structure_name',
        '#save_mode_visible',
        '#load_mode_visible',
        '#data_mode_visible',
        '#text_box_metadata_name',
        '#corner_mode_visible',
        '#ugc_max_grid_items',
        '#screenshot_texture',
        '#screenshot_zip_folder',
        '#screenshot_file_system',
        '#world_template_name',
        '#world_template_description',
        '#world_template_version',
        '#world_template_item_grid_dimension',
        '#invalid_world_template_item_grid_dimension',
        '#loading_world_template_item_grid_dimension',
        '#ui_profile_dropdown_enabled',
        '#ui_profile_dropdown_toggle_label',
        '#max_framerate',
        '#max_framerate_enabled',
        '#max_framerate_steps',
        '#max_framerate_slider_label',
        '#vr_hand_controls_item',
        '#vr_hand_controls_item_enabled',
        '#vr_hand_controls_hud',
        '#vr_hand_controls_hud_enabled',
        '#vr_hand_pointer',
        '#vr_hand_pointer_enabled',
        '#vr_hands_visible',
        '#vr_hands_visible_enabled',
        '#enable_chat_text_to_speech',
        '#enable_chat_text_to_speech_enabled',
        '#sticky_mining_hand',
        '#sticky_mining_hand_enabled',
        '#realm_name_enabled',
        '#realms_difficulty_dropdown_enabled',
        '#realms_game_mode_dropdown_enabled',
        '#difficulty_option_label',
        '#gameMode_option_label',
        '#world_game_mode_radio_survival',
        '#world_game_mode_radio_creative',
        '#player_game_mode_radio_survival',
        '#player_game_mode_radio_creative',
        '#world_type_radio_flat',
        '#world_type_radio_infinite',
        '#world_difficulty_radio_peaceful',
        '#world_difficulty_radio_easy',
        '#world_difficulty_radio_normal',
        '#world_difficulty_radio_hard',
        '#advanced_video_options',
        '#language_initial_selected',
        '#dev_debug_hud_dropdown_enabled',
        '#invite_toggle_state',
        '#member_settings',
        '#operator',
        '#force_user_agreement_level',
        '#force_user_agreement_level_enabled',
        // +1.1
        '#x_helper_visible',
        '#y_helper_visible',
        '#coins_without_bonus',
        '#coin_offer_texture_name',
        '#coin_offer_texture_file_system',
        '#coin_offers_visible',
        '#coin_loading_visible',
        '#block_type_icon_texture',
        '#close_button_visible_binding_name',
        '#minimize_button_visible_binding_name',
        '#maximized_input_visible',
        '#block_type_dropdown_enabled',
        '#condition_dropdown_enabled',
        '#redstone_dropdown_enabled',
        '#block_type_dropdown_toggle_label',
        '#condition_dropdown_toggle_label',
        '#redstone_dropdown_toggle_label',
        '#track_output_binding',
        '#has_only_armor_slot',
        '#has_only_carpet_slot',
        '#has_armor_and_saddle_slot',
        '#has_carpet_and_saddle_slot',
        '#chest_tab_toggle',
        '#renderer_tab_toggle',
        '#has_saddle_slot',
        '#empty_offhand_image_visible',
        '#toggle_invite_state',
        '#world_description',
        '#world_screenshots_grid_dimensions',
        '#world_screenshot_texture_name',
        '#world_screenshot_texture_file_system',
        '#navigation_tab',
        '#coin_visible',
        '#action_button_visible',
        '#item_meets_requirements',
        '#mob_effect_name',
        '#mob_effect_timer',
        '#mob_effect_grid_size',
        '#local_world_image',
        '#local_world_texture_source',
        '#world_lock_visible',
        '#no_local_worlds_switch_setting_visible',
        '#switch_storage_type_enabled',
        '#switch_storage_type_toggle_label',
        '#storage_location_radio_external',
        '#storage_location_radio_package',
        '#join_and_download_everything',
        '#join_and_download_only_add_on',
        '#join_and_download',
        '#empty_binding',
        '#remix_name_content_binding_name',
        '#remix_description_content_binding_name',
        '#new_tag_visible',
        '#polymorphic_button_visible',
        '#download_progress_bar_visible',
        '#download_info_text',
        '#download_info_visible',
        '#navigation_tab_focus_precedence',
        '#navigation_tab_toggle_on_hover',
        '#local_safe_zone_offset',
        '#safe_zone',
        '#safe_zone_enabled',
        '#safe_zone_slider_label',
        '#button_action_text',
        '#skin_pack_price',
        '#dependency_label_text',
        '#dependent_packs_length',
        '#delete_button_enabled',
        '#share_button_enabled',
        '#category_panel_visible',
        '#storage_panel_length',
        '#search_panel_visible',
        '#search_panel_length',
        '#multiselectEnabled',
        '#storage_dropdown',
        '#show_disconnected_button',
        '#show_signin_button',
        '#show_xbl_profile_info',
        '#gamer_pic_texture',
        '#gamer_pic_file_source',
        '#featured_item_grid_dimension',
        '#featured_item_texture_path',
        '#featured_item_texture_file_system',
        '#item_does_not_meet_requirements',
        '#featured_item_does_not_meet_requirements',
        '#featured_coin_visible',
        '#title_label',
        '#creator_label',
        '#offer_coin_visible',
        '#offer_price',
        '#coin_balance',
        '#page_loading_visible',
        '#list_grid_dimensions',
        '#invisible_blocks_binding_name',
        '#invisible_blocks_enabled',
        '#invisible_blocks_toggle_off',
        '#invisible_blocks_toggle_on',
        '#include_players_binding_name',
        '#include_players_enabled',
        '#include_players_toggle_off',
        '#include_players_toggle_on',
        '#remove_blocks_binding_name',
        '#remove_blocks_enabled',
        '#remove_blocks_toggle_off',
        '#remove_blocks_toggle_on',
        '#mode_dropdown_enabled',
        '#mode_dropdown_toggle_label',
        '#progress_panel_visible',
        '#structure_renderer_visible',
        '#bottom_left_block',
        '#top_right_block',
        '#include_entities',
        '#remove_blocks',
        '#include_players',
        '#include_entities_binding_name',
        '#include_entities_enabled',
        '#export_mode_panel_visible',
        '#has_icon',
        '#item_stack_count',
        '#sell_item_name',
        '#show_second_trade_slot',
        '#templates_padding_visible',
        '#content_area_focused',
        '#selector_area_focused',
        '#websocket_encryption',
        '#websocket_encryption_enabled',
        '#file_storage_location_enabled',
        '#build_id',
        '#build_date',
        '#smooth_lighting',
        '#smooth_lighting_enabled',
        '#dev_show_build_info',
        '#dev_show_build_info_enabled',
        '#dev_realms_environment_radio_production',
        '#dev_realms_environment_radio_staging',
        '#dev_realms_environment_radio_dev',
        '#command_impulse_mode',
        '#command_chain_mode',
        '#command_repeat_mode',
        '#command_conditional_mode',
        '#command_unconditional_mode',
        '#command_always_on_mode',
        '#command_needs_redstone_mode',
        '#world_game_mode_radio_adventure',
        '#player_game_mode_radio_adventure',
        '#world_type_radio_old',
        '#keyboard_mouse_sensitivity_slider_label',
        '#vr_ui_mouse_sensitivity_slider_label',
        '#controller_sensitivity_slider_label',
        '#vr_sensitivity_slider_label',
        '#vr_roll_turn_sensitivity_slider_label',
        '#touch_sensitivity_slider_label',
        '#button_size_slider_label',
        '#gamertag_label',
        '#gui_scale_slider_label',
        '#gamma_slider_label',
        '#vr_gamma_slider_label',
        '#field_of_view_slider_label',
        '#render_distance_slider_label',
        '#vr_render_distance_slider_label',
        '#msaa_slider_label',
        '#vr_msaa_slider_label',
        '#particle_render_distance_slider_label',
        '#vr_particle_render_distance_slider_label',
        '#ui_profile_radio_classic',
        '#ui_profile_radio_pocket',
        '#thirdperson_radio_first',
        '#thirdperson_radio_third_back',
        '#thirdperson_radio_third_front',
        '#music_volume_slider_label',
        '#sound_volume_slider_label',
        '#language_description',
        '#dev_connection_quality_slider_label',
        '#debug_hud_radio_off',
        '#debug_hud_radio_basic',
        '#debug_hud_radio_workerthreads',
        '#debug_hud_radio_renderchunks',
        '#debug_hud_radio_debugtextures',
        '#download_progress_bar_percentage',
        // +1.2
        '#eula_visible',
        '#background_visible',
        '#auto_save_animation_visible',
        '#is_photo_page',
        '#pick_item_visible',
        '#pick_grid_dimensions',
        '#editable',
        '#finalize_button_enabled',
        '#close_button_visible',
        '#page_number',
        '#edit_controls_active',
        '#page_visible',
        '#viewing',
        '#signing',
        '#picking',
        '#exporting',
        '#empty_fuel_image_visible',
        '#brewing_fuel_ratio',
        '#locked',
        '#lock_label_text',
        '#lock_visible',
        '#keyboard_button_focus_override_up',
        '#keyboard_button_focus_override_down',
        '#hide_chat',
        '#hide_chat_enabled',
        '#bottom_button_focus_override_up',
        '#bottom_button_focus_override_down',
        '#chat_title_text',
        '#text_chat_hidden',
        '#price_text',
        '#coins_required_for_purchase',
        '#has_coin_offers',
        '#coin_offer_size',
        '#report_button_visible_feeditem',
        '#delete_button_visible_feeditem',
        '#report_button_visible_comment',
        '#delete_button_visible_comment',
        '#comment_grid_dimension',
        '#comment_content',
        '#content',
        '#text_visible',
        '#likes_and_comments',
        '#screenshot_texture_source',
        '#textpost_content',
        '#textpost_visible',
        '#comment_text_box',
        '#gamerpic_texture',
        '#comment_gamerpic_texture',
        '#comment_texture_source',
        '#comment_gamerpic_visible',
        '#comment_gamertag',
        '#likes_and_time_since_comment_post',
        '#author_gamertag',
        '#time_since_feed_post',
        '#access_screen_visible',
        '#no_feed_item_visible',
        '#feed_grid_dimension',
        '#feed_text_visible',
        '#feed_texture',
        '#feed_texture_source',
        '#gamerpic_texture_source',
        '#feed_screenshot_texture',
        '#feed_screenshot_texture_source',
        '#share_text_box',
        '#report_button_visible',
        '#delete_button_visible',
        '#feed_world_name',
        '#button_glyph_visible',
        '#cheats_on',
        '#host_main_button_focus_override_up',
        '#host_main_button_focus_override_down',
        '#sub_command',
        '#host_teleport_visible',
        '#host_teleport_main_visible',
        '#host_teleport_players_visible',
        '#host_time_visible',
        '#host_weather_visible',
        '#host_option_focus_id',
        '#host_option_focus_override_left',
        '#host_option_focus_override_right',
        '#host_option_focus_override_up',
        '#host_option_focus_override_down',
        '#host_main_visible',
        '#splitscreen_enabled',
        '#paper_doll_visible',
        '#is_armor_visible',
        '#hud_visible_centered_gui_elements',
        '#jukebox_text',
        '#drop_item_tooltip_helper_visible',
        '#mine_tooltip_visible',
        '#context_sensitive_visible',
        '#dismount_tooltip_visible',
        '#crafting_tooltip_helper_visible',
        '#paper_doll_visible_living_room',
        '#hud_alpha',
        '#hud_propagate_alpha',
        '#recipe_item_name',
        '#needs_crafting_table',
        '#is_left_tab_inventory',
        '#pocket_right_pane_visible',
        '#gamepad_helper_x_visible',
        '#gamepad_helper_y_visible',
        '#gamepad_helper_a_visible',
        '#gamepad_helper_ls_visible',
        '#is_recipe_book_layout',
        '#is_creative_layout',
        '#is_survival_layout',
        '#is_left_tab_search',
        '#container_item_background_texture',
        '#container_item_background',
        '#container_item_modifier',
        '#recipe_book_total_items',
        '#tab_label_text',
        '#creative_layout_button_visible',
        '#animating_text_visible',
        '#animating_text',
        '#manage_feed_grid_dimension',
        '#manage_content',
        '#manage_feed_text_visible',
        '#time_since_manage_feed_post',
        '#nrreports',
        '#manage_gamertag',
        '#manage_feed_texture',
        '#manage_feed_texture_source',
        '#manage_textpost_content',
        '#manage_textpost_visible',
        '#manage_gamerpic_texture',
        '#manage_gamerpic_texture_source',
        '#manage_gamerpic_visible',
        '#progress_loading_anim_visible',
        '#section_content',
        '#ratings_panel_5stars_visible',
        '#rating_text',
        '#number_of_ratings',
        '#player_rating_number',
        '#player_rating_visible',
        '#ratings_valid',
        '#main_mashup_key_art_texture',
        '#main_mashup_key_art_file_system',
        '#rate_button_visible',
        '#resource_pack_interact_visible',
        '#author_button_text',
        '#total_ratings_count',
        '#rating_button_text',
        '#pack_title',
        '#pack_contents_description',
        '#contents_description_visible',
        '#author_label',
        '#pack_description',
        '#modal_title_text',
        '#modal_label_text',
        '#modal_left_button_text',
        '#modal_middle_button_text',
        '#modal_rightcancel_button_text',
        '#skin_visible',
        '#basic_visible',
        '#maximized_edit_visible',
        '#maximized_placeholder_text',
        '#button_name_edit_visible',
        '#is_url_action',
        '#is_command_action',
        '#commands_enabled',
        '#action_count',
        '#help_visible',
        '#add_buttons_enabled',
        '#advanced_visible',
        '#student_model_update',
        '#interact_text',
        '#student_button_text',
        '#is_url_button',
        '#is_command_button',
        '#student_button_visible',
        '#student_button_grid_dimensions',
        '#student_view_visible',
        '#teacher_view_visible',
        '#server_store_button_visible',
        '#show_clubs',
        '#disconnected_from_xbox_live_label_visible',
        '#permissions_visible',
        '#player_permission_level_icon_texture',
        '#permissions_grid_dimension',
        '#option_state_name',
        '#option_name',
        '#permission_level_dropdown_icon_texture',
        '#world_button_focus_identifier',
        '#menu_realms_feed_visible',
        '#menu_realms_feed_enabled',
        '#servers_network_world_item_grid_dimension',
        '#server_player_count',
        '#third_party_featured_item_grid_dimension',
        '#featured_servers_visible',
        '#third_party_screenshot_visible',
        '#show_ping_loading',
        '#third_party_server_name',
        '#third_party_server_message',
        '#third_party_server_logo_texture_path',
        '#third_party_server_logo_resource_location',
        '#legacy_world_name',
        '#legacy_world_game_mode',
        '#legacy_world_date',
        '#legacy_world_date_visible',
        '#legacy_worldfile_size',
        '#legacy_world_item_grid_dimension',
        '#join_by_code_visible',
        '#sync_legacy_worlds_button_visible',
        '#worlds_tab_import_button_focus_down_override',
        '#friends_tab_invitation_button_focus_down_override',
        '#loading_legacy_worlds_grid_visible',
        '#legacy_worlds_visible',
        '#disconnected_from_xbl_visible',
        '#disconnected_from_network_visible',
        '#loading_servers_progress_visible',
        '#feature_server_message_visible',
        '#bumper_tooltips_visible',
        '#footer_text',
        '#loading_bar_percentage',
        '#invited_friends_visible',
        '#member_loading_text',
        '#blocked_players_visible',
        '#blocked_players_grid_dimension',
        '#linkurl',
        '#copy_share_enabled',
        '#default_message_visible',
        '#refresh_message_visible',
        '#tag_factory_length',
        '#is_using_gamepad',
        '#has_subpacks',
        '#content_tier_options_visible',
        '#content_tier_label',
        '#content_tier_supported',
        '#incompatible_reason',
        '#screenshotpicker_grid_dimension',
        '#validation_failure_visible',
        '#screenshotpicker_visible',
        '#screenshotpicker_screenshot_time',
        '#screenshotpicker_timesince_visible',
        '#screenshotpicker_texture',
        '#screenshotpicker_texture_source',
        '#validation_succeeded',
        '#is_delete_visible',
        '#no_screenshot_visible',
        '#caption_text_box',
        '#toggle_selected',
        '#hotbar_visible_not_centered',
        '#is_left_tab_construct',
        '#is_left_tab_equipment',
        '#is_left_tab_items',
        '#is_left_tab_nature',
        '#filtering_enabled',
        '#button_mode_enabled',
        '#members_prevButton_visible',
        '#members_nextButton_visible',
        '#invited_friends_prevButton_visible',
        '#invited_friends_nextButton_visible',
        '#uninvited_friends_prevButton_visible',
        '#uninvited_friends_nextButton_visible',
        '#blocked_players_prevButton_visible',
        '#blocked_players_nextButton_visible',
        '#members_page_index_text',
        '#members_buttons_visible',
        '#invited_friends_page_index_text',
        '#invited_friends_buttons_visible',
        '#uninvited_friends_page_index_text',
        '#uninvited_friends_buttons_visible',
        '#blocked_players_page_index_text',
        '#blocked_players_buttons_visible',
        '#safe_zone_all',
        '#safe_zone_all_enabled',
        '#safe_zone_all_slider_label',
        '#safe_zone_x_slider_label',
        '#safe_zone_x',
        '#safe_zone_x_enabled',
        '#safe_zone_y_slider_label',
        '#safe_zone_y',
        '#safe_zone_y_enabled',
        '#screen_position_x',
        '#screen_position_x_enabled',
        '#screen_position_x_slider_label',
        '#screen_position_y',
        '#screen_position_y_enabled',
        '#screen_position_y_slider_label',
        '#is_posting',
        '#form_button_length',
        '#form_button_texture',
        '#form_button_texture_file_system',
        '#custom_form_length',
        '#submit_button_visible',
        '#custom_toggle_state',
        '#custom_radio_toggle',
        '#custom_input_text',
        '#custom_radio_toggled',
        '#polymorphic_button_enabled',
        '#grid_button_focus_id',
        '#grid_button_override_left',
        '#grid_button_override_right',
        '#grid_button_override_up',
        '#skin_button_visible',
        '#pack_loading_progress_visible',
        '#accept_skin_button_enabled',
        '#left_visible',
        '#skin_cycle_pack_left_button_enabled',
        '#cycle_pack_right_button_visible',
        '#right_visible',
        '#skin_cycle_pack_right_button_enabled',
        '#skin_content_visible',
        '#skin_search_progress_visible',
        '#howtoplay_visible',
        '#update_icon_visible',
        '#new_offer_icon_visible',
        '#prompt_icon_visible',
        '#prompt_icon_texture',
        '#sign_in_focus_enabled',
        '#featured_grid_item_id',
        '#featured_grid_item_override_up',
        '#featured_grid_item_override_left',
        '#featured_rating_ratio',
        '#featured_rating',
        '#featured_ratings_visible',
        '#featured_creator_label',
        '#featured_prompt_text',
        '#featured_icon_visible',
        '#featured_offer_override_up',
        '#offer_download_progress_label',
        '#show_more_visible',
        '#show_more_text',
        '#rating_text_visible',
        '#offer_prompt_text',
        '#offer_grid_item_button_focus_id',
        '#left_most_grid_item_focus_override_left',
        '#right_most_grid_item_focus_override_right',
        '#collection_page_number_label',
        '#offer_type_label',
        '#promo_texture_path',
        '#promo_texture_file_system',
        '#promo_wrapped',
        '#promo_row_visible',
        '#promo_row_loading_visible',
        '#promo_row_text',
        '#promo_unlock_date',
        '#past_promo_texture_path',
        '#past_promo_texture_file_system',
        '#promo_grid_button_focus_id',
        '#promo_grid_button_focus_left',
        '#promo_grid_button_focus_right',
        '#past_promo_row_grid_dimension',
        '#promo_offer_today',
        '#future_promo_row_grid_dimension',
        '#list_maximum_grid_items',
        '#export_enabled',
        '#export_visible',
        '#show_xbox_icon',
        '#text_padding_visible',
        '#controller_start_icon',
        '#item_grayed_out',
        '#not_bound',
        '#template_download_text',
        '#download_text_visible',
        '#template_list_visible',
        '#suggested_content_visible',
        '#suggested_offers_item_grid_dimension',
        '#texture_location_type',
        '#gamer_score',
        '#is_new_account',
        '#url',
        '#code',
        '#gamertag_found',
        '#player_uuid',
        '#block_player',
        '#mute_player',
        '#friend_status_dropdown_toggle_label',
        '#is_friend',
        '#currently_playing_visible',
        '#currently_playing',
        '#texture_path',
        '#reason_selected',
        '#show_item',
        '#inactive_item',
        '#item_pickup_time',
        '#inventory_selected_banner_patterns',
        '#inventory_selected_banner_colors',
        '#gamepad_cursor_visible',
        '#safezone_outer_top',
        '#safezone_inner_top',
        '#hide_tooltips',
        '#hide_tooltips_enabled',
        '#hide_gamepad_cursor',
        '#hide_gamepad_cursor_enabled',
        '#gamepad_cursor_sensitivity',
        '#gamepad_cursor_sensitivity_enabled',
        '#gamepad_cursor_sensitivity_slider_label',
        '#server_settings_visible',
        '#classroom_settings_visible',
        '#start_with_map',
        '#start_with_map_enabled',
        '#bonus_chest',
        '#bonus_chest_enabled',
        '#player_permissions_dropdown_toggle_label',
        '#player_permissions_dropdown_enabled',
        '#show_permissions_dropdown',
        '#server_sim_distance',
        '#server_sim_distance_enabled',
        '#server_sim_distance_steps',
        '#server_sim_distance_slider_label',
        '#show_coordinates',
        '#show_coordinates_enabled',
        '#fire_spreads',
        '#fire_spreads_enabled',
        '#tnt_explodes',
        '#tnt_explodes_enabled',
        '#mob_loot',
        '#mob_loot_enabled',
        '#natural_regeneration',
        '#natural_regeneration_enabled',
        '#tile_drops',
        '#tile_drops_enabled',
        '#daylight_cycle',
        '#daylight_cycle_enabled',
        '#keep_inventory',
        '#keep_inventory_enabled',
        '#mob_spawn',
        '#mob_spawn_enabled',
        '#mob_griefing',
        '#mob_griefing_enabled',
        '#entities_drop_loot',
        '#entities_drop_loot_enabled',
        '#weather_cycle',
        '#weather_cycle_enabled',
        '#classroom_settings',
        '#classroom_settings_enabled',
        '#perfect_weather',
        '#perfect_weather_enabled',
        '#allow_mobs',
        '#allow_mobs_enabled',
        '#allow_destructive_items',
        '#allow_destructive_items_enabled',
        '#player_damage',
        '#player_damage_enabled',
        '#immutable_world',
        '#immutable_world_enabled',
        '#pvp_damage',
        '#pvp_damage_enabled',
        '#xbl_broadcast_dropdown_toggle_label',
        '#show_broadcast_dropdown',
        '#multiplayer_warning_visible',
        '#club_description_enabled',
        '#club_description_visible',
        '#club_description',
        '#manage_feed_button_enabled',
        '#manage_feed_button_visible',
        '#club_infotext_visible',
        '#show_auto_save_icon',
        '#show_auto_save_icon_enabled',
        '#hide_hand',
        '#hide_hand_enabled',
        '#hide_paperdoll',
        '#hide_paperdoll_enabled',
        '#classic_box_selection',
        '#classic_box_selection_enabled',
        '#vr_classic_box_selection',
        '#vr_classic_box_selection_enabled',
        '#ingame_player_names',
        '#ingame_player_names_enabled',
        '#interface_opacity',
        '#interface_opacity_enabled',
        '#interface_opacity_slider_label',
        '#split_screen_dropdown_enabled',
        '#splitscreen_interface_opacity_enabled',
        '#splitscreen_ingame_player_names',
        '#splitscreen_ingame_player_names_enabled',
        '#vr_hide_hud',
        '#vr_hide_hud_enabled',
        '#vr_hide_hand',
        '#vr_hide_hand_enabled',
        '#field_of_view_toggle',
        '#field_of_view_toggle_enabled',
        '#dev_date_year_override',
        '#dev_date_month_override',
        '#dev_date_day_override',
        '#dev_display_override_datetime',
        '#dev_display_override_datetime_enabled',
        '#dev_save_current_override_date',
        '#dev_save_current_override_date_enabled',
        '#dev_override_day_length',
        '#update_override_date_button_visible',
        '#override_date_options_visible',
        '#dev_show_override_treatments_enabled',
        '#dev_show_override_treatments',
        '#dev_treatment_id',
        '#dev_treatment_id_enabled',
        '#treatments_grid_dimension',
        '#dev_display_treatments_panel',
        '#treatment_id',
        '#feature_toggle_state',
        '#feature_toggle_count',
        '#dev_server_instance_thread',
        '#dev_server_instance_thread_enabled',
        '#dev_find_mobs',
        '#dev_find_mobs_enabled',
        '#dev_render_attach_pos_enabled',
        '#dev_new_culler',
        '#dev_new_culler_enabled',
        '#dev_assertions_debug_break',
        '#dev_assertions_debug_break_enabled',
        '#dev_mce_assertions_debug_break_hack',
        '#dev_mce_assertions_debug_break_hack_enabled',
        '#dev_show_dev_console_button',
        '#dev_show_dev_console_button_enabled',
        '#dev_enable_mixer_interactive',
        '#dev_enable_mixer_interactive_enabled',
        '#dev_show_tcui_replacement',
        '#dev_show_tcui_replacement_enabled',
        '#dev_use_zipped_in_package_packs',
        '#dev_use_zipped_in_package_packs_enabled',
        '#dev_import_packs_as_zip',
        '#dev_import_packs_as_zip_enabled',
        '#dev_use_override_date',
        '#dev_use_override_date_enabled',
        '#dev_display_treatments_panel_enabled',
        '#mem_check_timer',
        '#mem_check_timer_enabled',
        '#mem_check_timer_steps',
        '#protocol_version',
        '#world_conversion_version',
        '#hide_hud',
        '#hide_hud_enabled',
        '#vr_transparent_leaves',
        '#vr_transparent_leaves_enabled',
        '#render_clouds',
        '#vr_smooth_lighting',
        '#vr_smooth_lighting_enabled',
        '#can_change_name',
        // +1.3/1.4
        '#loading_achievement_panel_visible',
        '#adhoc_title',
        '#show_missing_coins',
        '#report_to_club_button_visible_feeditem',
        '#report_to_enforcement_button_visible_feeditem',
        '#report_to_club_button_visible_comment',
        '#report_to_enforcement_button_visible_comment',
        '#report_to_enforcement_button_visible',
        '#report_to_club_button_visible',
        '#infinite_progress_visible',
        '#progress_text_visible',
        '#realms_button_visible',
        '#is_creative_and_recipe_book_layout',
        '#is_creative_and_creative_layout',
        '#is_deleting',
        '#is_done_validating',
        '#is_interaction_button_visible',
        '#ratings_summary_valid',
        '#ratings_hover_button_focus_enabled',
        '#rating_status_valid',
        '#has_content_tiering',
        '#playername_visible',
        '#invite_button_enabled',
        '#disconnected_from_nex_label_visible',
        '#disconnected_from_adhoc_label_visible',
        '#disconnected_from_crossplatform_multiplayer',
        '#disconnected_from_multiplayer',
        '#player_toggle_state',
        '#option_toggle_state',
        '#can_edit_permissions',
        '#permission_level_dropdown_label',
        '#friends_server_icon_texture_name',
        '#cross_platform_friends_server_icon_texture_name',
        '#network_world_header_icon_texture_path',
        '#network_world_header_icon_texture_location',
        '#privilegesBlockedText',
        '#add_friend_button_visible',
        '#no_nex_multiplayer_grid_visible',
        '#cross_platform_friends_grid_visible',
        '#cross_platform_no_friends_grid_visible',
        '#no_cross_platform_multiplayer_grid_visible',
        '#multiplayer_blocked_panel_visible',
        '#is_coin_visible',
        '#confirmation_button_text',
        '#matching_branch_name',
        '#matching_commit_id',
        '#time_since_text',
        '#world_text',
        '#date_text',
        '#time_text',
        '#backup_item_button_enabled',
        '#realms_backup_grid_dimension',
        '#backup_infotext',
        '#backup_network_errormsg',
        '#progress_loading_bars_backups_visible',
        '#backup_network_error_visible',
        '#options_visible',
        '#has_errors',
        '#error_free',
        '#report_generating',
        '#has_pack_settings',
        '#player_score_sidebar',
        '#player_name_sidebar',
        '#objective_sidebar_name',
        '#scoreboard_sidebar_size',
        '#scoreboard_sidebar_visible',
        '#scoreboard_list_player_icon',
        '#scoreboard_list_player_icon_filesystem',
        '#scoreboard_list_player_name',
        '#scoreboard_list_player_score',
        '#scoreboard_list_connection',
        '#scoreboard_list_size',
        '#scoreboard_list_scoretype_score',
        '#scoreboard_list_scoretype_hearts',
        '#scoreboard_show_tab',
        '#skin_button_game_pad_visible',
        '#skin_button_not_game_pad_visible',
        '#is_using_gamepad_icon',
        '#focus_override_left',
        '#focus_override_right',
        '#nx_signin_text',
        '#gamerpic_texture_path',
        '#gamerpic_texture_location_type',
        '#gamertag_pic_and_label_visible',
        '#online_buttons_visible',
        '#hero_offer_price_text',
        '#hero_offer_coin_icon_visible',
        '#hero_offer_description_visible',
        '#hero_offer_title',
        '#hero_offer_author',
        '#category_collection_ready',
        '#search_error_panel_visible',
        '#search_results_panel_visible',
        '#filter_selected_count',
        '#search_visible',
        '#filter_screen_enabled',
        '#top_row_focus_override_up',
        '#trending_row_name',
        '#trending_offers_dimensions',
        '#trending_rows_dimensions',
        '#search_active',
        '#trending_page_loading_visible',
        '#sort_type_text',
        '#relevance_toggle_visible',
        '#sort_menu_visible',
        '#sort_screen_enabled',
        '#generate_random_button_enabled',
        '#realms_info_text',
        '#search_in_progress',
        '#message_panel_visible',
        '#add_friend_button_text',
        '#remove_friend_button_text',
        '#add_remove_in_progress',
        '#is_selected_slot',
        '#show_hovered_slot',
        '#using_touch',
        '#keyboard_show_full_keyboard_options_enabled',
        '#keyboard_show_standard_keyboard_options',
        '#keyboard_show_full_keyboard_options',
        '#keyboard_smooth_rotation_speed',
        '#keyboard_smooth_rotation_speed_enabled',
        '#swap_gamepad_ab_buttons',
        '#swap_gamepad_ab_buttons_enabled',
        '#swap_gamepad_xy_buttons',
        '#swap_gamepad_xy_buttons_enabled',
        '#hotbar_only_touch',
        '#hotbar_only_touch_enabled',
        '#general_multiplayer_warning_text',
        '#general_multiplayer_warning_label_visible',
        '#xbl_show_broadcast_dropdown',
        '#can_be_xbl_enabled',
        '#education_toggle',
        '#education_toggle_enabled',
        '#experimental_gameplay',
        '#experimental_gameplay_enabled',
        '#show_experimental_gameplay',
        '#pvp',
        '#pvp_enabled',
        '#platform_show_broadcast_dropdown',
        '#can_be_nex_enabled',
        '#how_to_play_gamepad_helper_label_text',
        '#how_to_play_gamepad_helper_label_visible',
        '#switch_coin_debug',
        '#switch_coin_debug_enabled',
        '#show_switch_coin_debug',
        '#multithreaded_rendering',
        '#multithreaded_rendering_enabled',
        '#show_multithreaded_rendering',
        '#dev_xforge_requests_require_sign_in',
        '#dev_xforge_requests_require_sign_in_enabled',
        '#atmospherics',
        '#atmospherics_enabled',
        '#edge_highlight',
        '#edge_highlight_enabled',
        '#bloom',
        '#bloom_enabled',
        '#terrain_shadows',
        '#terrain_shadows_enabled',
        '#super_fancy_water',
        '#super_fancy_water_enabled',
        '#rendering_profile',
        '#rendering_profile_slider_enabled',
        '#rendering_profile_steps',
        '#render_clouds_enabled',
        '#screen_animations',
        '#screen_animations_enabled',
        '#screen_animations_visible',
        '#device_id',
        '#commerce_id',
        '#auto_update_enabled',
        '#auto_update_mode_dropdown_toggle_label',
        '#gui_scale_visible',
        // +1.5
        '#show_ios_account_error',
        '#show_popup_button',
        '#text_edit_box_focus_override_up',
        '#text_edit_box_focus_override_down',
        '#action_button_enabled',
        '#purchase_panel_visible',
        '#purchase_with_currency_button_text',
        '#purchase_with_coins_button_text',
        '#markdown_percentage',
        '#is_on_sale',
        '#full_price',
        '#item_skin_count',
        '#item_skin_count_visible',
        '#item_world_template_count',
        '#item_world_template_count_visible',
        '#item_resource_pack_count',
        '#item_resource_pack_count_visible',
        '#time_until_sale_expires',
        '#personal_realms_grid_visible',
        '#realm_nintendo_first_realm_purchase_button_visible',
        '#joinable_realms_panel_visible',
        '#ButtonName',
        '#sale_visible',
        '#coin_purchase_in_progress',
        '#show_no_xbl_and_local_content_warning',
        '#show_no_xbl_and_no_local_content_warning',
        '#is_sales_grid_visible',
        '#sales_grid_item_count',
        '#is_store_offer_grid_panel_visible',
        '#bubble_particles',
        '#bubble_particles_enabled',
        // +1.6
        '#popup_title',
        '#popup_message_student_text',
        '#chat_settings_button_enabled',
        '#chat_settings_main_enabled',
        '#no_friends_grid_message_text',
        '#no_friends_grid_message_visible',
        '#no_cross_platform_friends_grid_message_text',
        '#no_cross_platform_friends_grid_message_visible',
        '#general_no_multiplayer_grid_message_text',
        '#general_no_multiplayer_grid_message_visible',
        '#realm_default_permission_dropdown_toggle_label',
        '#realm_default_permission_dropdown_enabled',
        '#permission_dropdown_visible',
        '#permission_collection_dropdown_visible',
        '#force_pack_download_enabled_level',
        '#filter_screen_visible',
        '#durable_title_visible',
        '#sort_screen_visible',
        '#save_enabled',
        '#save_visible',
        '#load_enabled',
        '#load_visible',
        '#save_mode_panel_visible',
        '#load_mode_panel_visible',
        '#price',
        '#dev_assertions_show_dialog',
        '#dev_assertions_show_dialog_enabled',
        '#automation_unit_blacklist_test_tags',
        '#automation_repeat_count',
        '#automation_ingestion_endpoint',
        '#automation_testrun_id',
        '#automation_functional_test_block_input',
        '#automation_functional_test_block_input_enabled',
        '#automation_functional_test_tags',
        '#automation_unit_test_tags',
        '#automation_functional_blacklist_test_tags',
        '#platform_multiplayer_warning_text',
        '#platform_multiplayer_warning_label_visible',
        '#xbl_multiplayer_warning_text',
        '#xbl_multiplayer_warning_label_visible',
        // +1.7
        '#chat_message_spacing',
        '#chat_message_spacing_enabled',
        '#chat_message_spacing_custom_text',
        '#chat_settings_font_section_enabled',
        '#chat_settings_enabled',
        '#editor_button_visible',
        '#editor_grid_dimensions',
        '#show_editor_chooser',
        '#show_webview',
        '#webview_update',
        '#show_reset',
        '#show_reset_warning',
        '#coins_with_bonus',
        '#feed_comment_enabled',
        '#hud_title_text_string',
        '#hud_subtitle_text_string',
        '#buttons_panel_visible',
        '#purchase_panel_enabled',
        '#section_title_visible',
        '#item_page_section_content',
        '#list_has_display_objective',
        '#worldname',
        '#list_scores_not_empty',
        '#unscored_not_empty',
        '#player_list_title',
        '#player_rank',
        '#player_icon',
        '#player_icon_filesystem',
        '#player_score',
        '#unscored_list_size',
        '#scored_list_size',
        '#is_offer_collection_query',
        '#store_home_button_visible',
        '#gamertagpacks',
        '#store_section_content',
        '#is_creator_label_visible',
        '#ratings_visible',
        '#is_offer_collection_query_and_not_sale_collection',
        '#store_row_visible',
        '#store_row_ready',
        '#row_grid_dimensions',
        '#nav_button_texture',
        '#is_valid_nav_button',
        '#thumbnail_texture_path',
        '#thumbnail_texture_file_system',
        '#max_grid_offers',
        '#trending_rows_visible',
        '#xbox_icon_visible',
        '#code_builder',
        '#code_builder_enabled',
        '#command_blocks_enabled',
        '#command_blocks_enabled_on',
        // +1.8
        '#authentication_visible',
        '#buy_button_visible',
        '#confirm_button_visible',
        '#confirm_button_enabled',
        '#edu_store_purchase_button_text',
        '#terms_visible',
        '#edu_store_visible',
        '#font_color_grid_dimension',
        '#chat_settings_font_color_section_enabled',
        '#font_colors_toggle_check',
        '#chat_settings_color_section_enabled',
        '#editor_button_default',
        '#editor_button_text',
        '#show_webview_progress',
        '#undo_button_enabled',
        '#confirm_skin_button_enabled',
        '#delay_right_side_buttons_visible',
        '#is_owned',
        '#creator_name',
        '#key_art_texture',
        '#skin_locked',
        '#skin_default_focus',
        '#gamepad_button_visible',
        '#keyboard_key_visible',
        '#tooltip_visible',
        '#gamepad_button_icon',
        '#keyboard_key_text',
        '#keyboard_key_alpha',
        '#left_helper_count',
        '#right_helper_count',
        '#helper_description',
        '#world_texture',
        '#file_system',
        '#author',
        '#subtitle',
        '#imported_template',
        '#download_in_progress',
        '#show_in_game_prompt',
        '#show_fetch_error',
        '#welcome',
        '#show_worlds_populating_progress',
        '#library_max_grid_items',
        '#library_item_title',
        '#creator',
        '#grid_dimensions',
        '#key_art_texture_path',
        '#key_art_texture_file_system',
        '#offer_prompt_text_color',
        '#bundle_thumbnail_grid_dimensions',
        '#is_sale_timer_visible',
        '#video_button_enabled',
        '#see_more_button_text',
        '#realms_world_expiry_notification_visible',
        '#realm_consumable_to_subscription_visibility',
        '#teacher_content_visible',
        '#pack_icon_section_content',
        '#offer_prompt_text_visibility',
        '#offer_status_panel_visible',
        '#toast_subtitle_visible',
        '#inventory_selected_item_charged_item',
        '#hide_keyboard_tooltips',
        '#hide_keyboard_tooltips_enabled',
        '#is_world_template_locked',
        '#world_template_options_lock_warning_text',
        '#player_has_world_template_option_unlock_permissions',
        '#random_tick_speed',
        '#random_tick_speed_enabled',
        '#dev_override_time_scale',
        '#dev_show_latency_graph',
        '#dev_show_latency_graph_enabled',
        '#dev_newParticleSystem',
        '#dev_newParticleSystem_enabled',
        // +1.9
        '#image_texture',
        '#body_text',
        '#mute_all_texture',
        '#mute_all_text',
        '#chat_settings_mute_section_enabled',
        '#chat_line_spacing',
        '#chat_line_spacing_enabled',
        '#chat_line_spacing_custom_text',
        '#content_log_text',
        '#size_text',
        '#version_text',
        '#delete_realm_button_visible',
        '#pack_loading_no_connection_visible',
        '#education_template_visible',
        '#education_template_item_grid_dimension',
        '#immediaterespawn',
        '#immediaterespawn_enabled',
        '#unused_treatments_grid_dimension',
        '#MinecraftAccount_id',
        '#unused_treatment_id',
        '#feature_toggle_enabled',
        '#dev_show_server_chunk_map',
        '#dev_show_server_chunk_map_enabled',
        '#content_log',
        '#content_log_enabled',
        '#content_log_gui',
        '#content_log_gui_enabled',
        '#dev_game_tip',
        '#dev_game_tip_enabled',
        '#file_watcher',
        '#file_watcher_enabled',
        '#vsync_dropdown_toggle_label',
        '#vsync_dropdown_enabled',
        '#vsync_off',
        '#vsync_on',
        '#vsync_adaptive',
        // +1.10
        '#sign_in_button_visible',
        '#asking_to_buy_visible',
        '#confirming_purchase_visible',
        '#sign_in_ios_visible',
        '#show_popup_dismiss_button',
        '#focus_override_up',
        '#focus_override_down',
        '#focus_id_override',
        '#keyart_path',
        '#keyart_texture_file_system',
        '#offer_title',
        '#banner_visible',
        '#chat_typeface_dropdown_enabled',
        '#chat_typeface_dropdown_toggle_label',
        '#chat_font_size',
        '#chat_font_size_enabled',
        '#chat_font_size_custom_label',
        '#chat_typeface_visible',
        '#is_right_tab_loom',
        '#is_left_tab_patterns',
        '#pattern_cell_background_texture',
        '#container_cell_background_texture',
        '#empty_image_visible',
        '#pattern_selector_total_items',
        '#result_patterns',
        '#result_colors',
        '#currency_purchase_visible',
        '#purchase_with_currency_disclaimer',
        '#force_pack_download_locked_level',
        '#grid_list_visible',
        '#show_timer',
        '#header_visible',
        '#show_banner',
        '#nav_section_content',
        '#disclaimer_text_visible',
        '#toast_icon_section_content',
        '#pack_texture',
        '#title_name',
        '#description_text',
        '#dev_date_hour_override',
        '#dev_load_override_date',
        '#dev_load_override_date_enabled',
        '#timezonetype_dropdown_toggle_label',
        '#timezonetype_dropdown_enabled',
        '#timezonetype_radio_local',
        '#timezonetype_radio_utc',
        '#windows_store_dropdown_toggle_label',
        '#active_stores_label',
        '#select_windows_store_visible',
        '#content_log_file',
        '#content_log_file_enabled',
        '#dev_identity_env_dropdown_toggle_label',
        '#dev_identity_env_dropdown_dropdown_enabled',
        '#identity_environment_dev',
        '#identity_environment_test',
        '#identity_environment_prod',
        '#dev_date_minute_override',
        // +1.11
        '#is_right_tab_cartography',
        '#output_description',
        '#tts_dialog_body',
        '#tts_dialog_title',
        '#tts_offer_name',
        '#turtle_visible',
        '#turtle_text',
        '#limited_status_visible',
        '#appearance_status_brief_label',
        '#is_recent_grid_ready',
        '#is_appearance_visible',
        '#is_right_tab_stonecutter',
        '#is_left_tab_stones',
        '#stone_cell_background_texture',
        '#stone_selector_total_items',
        '#has_input_item',
        '#is_left_tab_trade',
        '#trade_toggle_enabled',
        '#trade_cross_out_visible',
        '#has_second_buy_item',
        '#trade_cell_background_texture',
        '#trade_item_count',
        '#single_slash_visible',
        '#double_slash_visible',
        '#second_trade_item_count',
        '#trade_price_different',
        '#padding_around_sell_item',
        '#hover_text',
        '#trade_possible',
        '#trade_tier_total',
        '#is_tier_unlocked',
        '#tier_name',
        '#show_level',
        '#tier_visible',
        '#trade_selector_total',
        '#exp_bar_visible',
        '#exp_possible_progress',
        '#trade_details_button_1_visible',
        '#trade_details_button_2_visible',
        '#enchantment_details_button_visible',
        '#item_valid',
        '#trade_button_enabled',
        '#name_label',
        '#trade_toggle_state',
        '#tts_enabled',
        '#shield_is_active',
        '#inventory_selected_banner_type',
        '#update_screen_patch_notes',
        '#update_screen_description',
        '#audible_keymapping_name',
        '#enable_ui_text_to_speech',
        '#enable_ui_text_to_speech_enabled',
        '#update_override_version_button_visible',
        '#override_version_options_visible',
        '#dev_version_major_override',
        '#dev_version_minor_override',
        '#dev_version_patch_override',
        '#perf_turtle',
        '#perf_turtle_enabled',
        '#dev_use_version_override',
        '#dev_use_version_override_enabled',
        // +1.12
        '#realms_grid_dimension',
        '#bonus_coins_visible',
        '#bonus_coins',
        '#execute_on_first_tick',
        '#execute_on_first_tick_enabled',
        '#messages_size',
        '#estimated_time',
        '#lesson_count',
        '#lesson_is_active_item',
        '#lesson_should_add_spacing_panel',
        '#lesson_title',
        '#item_title',
        '#active_lesson_content_title',
        '#content_title',
        '#active_lesson_title',
        '#active_title',
        '#active_lesson_creator',
        '#active_creator',
        '#active_lesson_goals',
        '#active_goals',
        '#is_active_lesson_multiplayer',
        '#active_tasks_count',
        '#active_task_label',
        '#task_text',
        '#show_course_content',
        '#show_course_populating_progress',
        '#recipe_search_tip_chevron_visible',
        '#recipe_search_tip_box_visible',
        '#should_display_new_icon',
        '#apply_to_realm_button_visible',
        '#bundle_offer_prompt_text_color',
        '#bundle_upsell_offer_alpha',
        '#is_valid_bundle_upsell',
        '#is_bundle_upsell_loading',
        '#singe_bundle_upsell_visible',
        '#bundle_upsell_offer_count',
        '#bundle_upsell_grid_visible',
        '#bundle_upsell_content_visible',
        '#bundle_upsell_progress_visible',
        '#bundle_upsell_row_visible',
        '#integrity_field',
        '#integrity_content_edit_box',
        '#seed_content_edit_box',
        '#rotation_enabled',
        '#rotation_steps',
        '#rotation_text_value',
        '#rotation_slider_label',
        '#mirror',
        '#mirror_enabled',
        '#mirror_steps',
        '#mirror_text_value',
        '#mirror_slider_label',
        '#data_mode_panel_visible',
        '#minimum_template_version',
        '#minimum_template_enabled',
        '#content_log_gui_option_enabled',
        '#content_log_location_text',
        '#ad_account_name',
        '#leak_memory_value',
        '#leak_memory_enabled',
        '#show_ad_debug_panel_button',
        '#show_ad_debug_panel_button_enabled',
        '#dev_disable_client_blob_cache',
        '#dev_disable_client_blob_cache_enabled',
        '#dev_force_client_blob_cache',
        '#dev_force_client_blob_cache_enabled',
        '#dev_show_doc_id',
        '#dev_show_doc_id_enabled',
        // +1.13
        '#error_title_text',
        '#error_number_label',
        '#error_number',
        '#correlation_id_label',
        '#correlation_id',
        '#toggle_tts',
        '#typeface_radio_mojangles',
        '#typeface_radio_notoSans',
        '#ten_player_button_visible',
        '#two_player_button_visible',
        '#is_active_lesson_enabled',
        '#show_edu_icon',
        '#show_end_poem',
        '#scroll_faster',
        '#templates_grid_dimension',
        '#template_version',
        '#is_skin_retrieval_finished',
        '#legacy_skin',
        '#no_network_message_visible',
        '#next_button_text',
        '#next_button_enabled',
        '#respawn_enabled',
        '#quit_enabled',
        '#buttons_and_deathmessage_visible',
        '#loading_message_visible',
        '#joincode_is_fetching',
        '#joincode_fetching_anim_texture',
        '#joincode_icon',
        '#joincode_icon_name',
        '#joincode_icon_slot_name',
        '#joincode_icon_left_focus_override',
        '#joincode_icon_focus_id',
        '#joincode_icon_count',
        '#show_ip_address',
        '#has_quiz',
        '#start_hosting_button_visible',
        '#edu_info_panel_visible',
        '#permissions_dropdown_label',
        '#permissions_dropdown_enabled',
        '#permissions_dropdown_button_label',
        '#permission_level_radio_visitor',
        '#permission_level_radio_member',
        '#permission_level_radio_operator',
        '#player_permissions_dropdown_toggle_button_icon_texture',
        '#remove_player_button_visible',
        '#template_column_count',
        '#divider_visible',
        '#template_row_count',
        '#local_templates_header',
        '#local_visible',
        '#in_bounds',
        '#is_view_more',
        '#template_texture',
        '#template_texture_source',
        '#template_texture_zip',
        '#world_texture_source',
        '#is_first',
        '#world_column_count',
        '#world_row_count',
        '#message_text_visible',
        '#message_text',
        '#game_tip_visible',
        '#immersive_reader_running',
        '#can_retry',
        '#error_text',
        '#immersive_reader_error',
        '#immersive_reader_loading',
        '#online_xbox_live_friend_grid_dimension',
        '#offline_xbox_live_friend_grid_dimension',
        '#online_platform_friend_grid_dimension',
        '#offline_platform_friend_grid_dimension',
        '#online_platform_friends_visible',
        '#online_xbox_live_friends_visible',
        '#offline_platform_friends_visible',
        '#no_platform_friends_visible',
        '#offline_xbox_live_friends_visible',
        '#no_xbox_live_friends_visible',
        '#cross_platform_enabled',
        '#header_text',
        '#icon',
        '#border_visible',
        '#can_clear',
        '#can_confirm',
        '#found_world_name',
        '#found_host_name',
        '#error_message',
        '#show_debug',
        '#is_ip_fallback',
        '#quiz_url_obtained',
        '#quiz_popup_text',
        '#quiz_query_in_progress',
        '#is_image_grayed_out',
        '#is_complete',
        '#error_type_label',
        '#has_errors_or_warnings',
        '#error_grid_dimensions',
        '#ip_text_box',
        '#ip_text_box_content',
        '#port_text_box',
        '#port_text_box_content',
        '#is_ip_tooltip_hover_panel_visible',
        '#ip_tooltip_hover_label',
        '#is_port_tooltip_hover_panel_visible',
        '#port_tooltip_hover_label',
        '#has_worlds',
        '#lan_network_world_item_grid_dimension',
        '#im_reader_button_visible',
        '#persona_enabled',
        '#disconnected_from_third_party_label_visible',
        '#permissions_button_visible',
        '#permissions_button_enabled',
        '#is_platform_icon_visible',
        '#content_rating_reverse',
        '#content_rating',
        '#star_empty',
        '#star_full',
        '#ratings_star_dimensions',
        '#realms_expiration_label',
        '#realm_expiration_banner_visible',
        '#in_realms_plus_button_visible',
        '#update_info_visible',
        '#update_check_visible',
        '#last_update_text',
        '#is_read_more',
        '#is_read_less',
        '#is_specail_offer_banner_visible',
        '#show_color_picker',
        '#color_single_page_size',
        '#right_panel_title_rarity',
        '#skin_pack_right_panel_usage_is_limited',
        '#skin_pack_right_panel_usage_text',
        '#purchase_with_currency_disclaimer_visible',
        '#is_featured_classic_skin_loading',
        '#is_featured_pack_visible',
        '#is_cycle_classic_skin_featured_section_ready',
        '#right_panel_description',
        '#is_right_panel_classic_custom_visible',
        '#right_panel_title',
        '#is_right_panel_classic_skin_pack_visible',
        '#skin_pack_author',
        '#skin_color_option_on',
        '#is_offer_on_sale',
        '#is_limited_time_offer',
        '#is_offer_purchasable_and_not_free',
        '#is_offer_new',
        '#is_offer_locked',
        '#current_panel_color',
        '#in_use_texture',
        '#in_use_texture_file_system',
        '#left_color_cycle_enabled',
        '#other_channels',
        '#color_picker_title',
        '#right_color_cycle_enabled',
        '#is_skin_index_visible',
        '#is_skin_selected',
        '#is_skin_equipped',
        '#classic_skin_index',
        '#has_capes',
        '#dressing_room_tabs_visible',
        '#rarity_bar_texture',
        '#rarity_bar_visible',
        '#rarity_color',
        '#is_piece_equipped',
        '#is_piece_selected',
        '#is_piece_being_previewed',
        '#has_defaults',
        '#sizing_options_on',
        '#limb_title',
        '#left_limb_enabled',
        '#is_leg_or_arms',
        '#is_none_option_visible',
        '#is_none_option_enabled',
        '#is_featured_cycle_button_enabled',
        '#is_cycle_featured_section_ready',
        '#is_subcategory_featured_section_visible',
        '#body_category_selected',
        '#style_category_selected',
        '#pack_additional_skin_count_text',
        '#is_classic_skin_pack_loading',
        '#is_skin_pack_multiplayer_restricted',
        '#is_default_skins_visible',
        '#is_owned_pack_section_visible',
        '#is_purchasable_pack_section_visible',
        '#is_skin_pack_screen_search_loading',
        '#is_skin_pack_section_visible',
        '#is_pack_category_section_visible',
        '#cape_count',
        '#is_cape_selection_visible',
        '#is_cape_section_visible',
        '#is_piece_section_visible',
        '#preview_appearance_on',
        '#is_classic_skin_current_offer_loading',
        '#is_category_section_visible',
        '#is_custom_skin_popup_visible',
        '#is_skin_picker_section_visible',
        '#network_world_button_enabled',
        '#is_network_available_and_ping_loading',
        '#worlds_diskspace',
        '#local_worlds_storage_size',
        '#legacy_worlds_storage_size',
        '#legacy_worlds_auto_sync_failed_visible',
        '#is_network_available_and_multiplayer_visible',
        '#realmsplus_expired_visible',
        '#platform_picture_path',
        '#platform_name',
        '#platform_info_visible',
        '#xbl_info_visible',
        '#manage_options_visible',
        '#is_preset_add_visible',
        '#is_retry_visible',
        '#is_preset_loading_visible',
        '#center_preset_size',
        '#enable_edit_appearance',
        '#left_panel_title',
        '#realms_subscription_loading_failed_message_visible',
        '#buy_visible',
        '#available_grid_visible',
        '#realms_visible',
        '#realms_grid_visible',
        '#selected_grid_visible',
        '#any_exceptions',
        '#num_errors',
        '#num_warnings',
        '#has_warnings',
        '#any_errors',
        '#any_warnings',
        '#permission_icon',
        '#can_click_player_button',
        '#platform_signin_text',
        '#play_button_right_focus',
        '#has_marketplace_errors',
        '#editions_visible',
        '#realms_chevron_visibility',
        '#inventory_page_loading_visible',
        '#rating_visible',
        '#3d_export_enabled',
        '#show_bounding_box_binding_name',
        '#show_bounding_box_enabled',
        '#show_bounding_box_toggle_off',
        '#show_bounding_box_toggle_on',
        '#mirror_x',
        '#mirror_z',
        '#3d_export_visible',
        '#export_disabled_visible',
        '#has_focus',
        '#block_position',
        '#3d_export_mode_panel_visible',
        '#is_download_in_progress',
        '#is_loading_in_progress',
        '#converted_world_preview_name',
        '#converted_world_preview_date_visible',
        '#converted_world_preview_date',
        '#converted_world_preview_game_mode',
        '#converted_world_preview_file_size',
        '#converted_world_preview_image',
        '#converted_world_preview_texture_source',
        '#realms_plus_template_item_grid_dimension',
        '#realms_plus_list_visible',
        '#custom_template_list_visible',
        '#custom_world_template_item_grid_dimension',
        '#should_display_no_internet_warning',
        '#respawn_radius',
        '#respawn_radius_enabled',
        '#base_game_version_debug_text',
        '#can_be_platform_network_enabled',
        '#can_be_server_enabled',
        '#create_on_realm_visible',
        '#store_mismatch_visible',
        '#realms_subscriptions_loading_failed_visible',
        '#realms_subscriptions_loading_visible',
        '#no_active_subscriptions_visible',
        '#realms_plus_subscriptions_dimensions',
        '#can_buy_more_subscriptions',
        '#additional_realms_subscriptions_dimensions',
        '#enable_auto_text_to_speech',
        '#enable_auto_text_to_speech_enabled',
        '#enable_open_chat_message',
        '#enable_open_chat_message_enabled',
        '#automation_repeat_failures_only',
        '#dev_toggle_default_font_overrides',
        '#dev_toggle_default_font_overrides_visible',
        '#dev_disable_render_terrain',
        '#dev_disable_render_terrain_enabled',
        '#dev_disable_render_entities',
        '#dev_disable_render_entities_enabled',
        '#dev_disable_render_blockentities',
        '#dev_disable_render_blockentities_enabled',
        '#dev_disable_render_particles',
        '#dev_disable_render_particles_enabled',
        '#dev_disable_render_sky',
        '#dev_disable_render_sky_enabled',
        '#dev_disable_render_weather',
        '#dev_disable_render_weather_enabled',
        '#dev_disable_render_hud',
        '#dev_disable_render_hud_enabled',
        '#dev_disable_render_item_in_hand',
        '#dev_disable_render_item_in_hand_enabled',
        '#ad_token_refresh_threshold',
        '#ad_token_refresh_threshold_text_value',
        '#ad_token_refresh_threshold_enabled',
        '#ad_token_refresh_threshold_steps',
        '#async_texture_loads',
        '#async_texture_loads_enabled',
        '#show_async_texture_loads',
        '#async_missing_texture',
        '#async_missing_texture_enabled',
        '#show_async_missing_texture',
        '#show_core_ui_shortcuts',
        '#allow_content_log_write_to_disk',
        '#has_account_error',
        '#ad_use_single_sign_on',
        '#account_transfer_status',
        '#realms_subscription_text',
        '#faq_price_text',
        '#content_tab_sections',
        '#packs_label',
        '#content_section_text',
        '#platform_term_controls',
        '#platform_terms_text',
        '#trial_desciption_text',
        '#buy_now_banner_text',
        '#realms_name_box',
        '#has_checked_tos',
        '#buy_now_button_text',
        // +1.14
        '#feed_comment_page_collection_length',
        '#is_author_linked_account',
        '#comment_platform_tag',
        '#author_platform_tag',
        '#unlink_warning_text',
        '#unlink_consequences_acknowledged',
        '#confirm_0',
        '#confirm_0_enabled',
        '#confirm_1',
        '#confirm_1_enabled',
        '#confirm_2',
        '#confirm_2_enabled',
        '#confirm_3',
        '#confirm_3_enabled',
        '#feed_page_collection_length',
        '#platform_tag',
        '#is_loading',
        '#gamerpic_texture_file_system',
        '#third_party_profile_pic',
        '#third_party_profile_pic_file_system',
        '#xbl_gamertag',
        '#current_game_label',
        '#third_party_tag',
        '#friend_button_focus_override_up',
        '#friend_button_focus_override_down',
        '#online_linked_account_friend_grid_dimension',
        '#offline_linked_account_friend_grid_dimension',
        '#can_change_skin',
        '#is_right_panel_classic_skin_pack_title_visible',
        '#is_redeemable',
        '#current_color_equipped',
        '#is_skin_not_equippable',
        '#online_safety_do_not_show_again',
        '#members_section_content',
        '#page_counter_label',
        '#friends_pagination_visible',
        '#invited_section_content',
        '#uninvited_section_content',
        '#blocked_section_content',
        '#third_party_profile_name',
        '#has_expired',
        '#unowned_grid_visible',
        '#should_show_subscription_tab',
        '#in_progress_title',
        '#message_line2_visible',
        '#progress_loading_visibility',
        '#realms_plus_one_month_free_trial_visible',
        '#gfx_texture_load_delay',
        '#gfx_texture_load_delay_enabled',
        '#gfx_texture_load_delay_steps',
        '#gfx_texture_load_delay_text_value',
        '#gfx_max_dequeued_textures_per_frame',
        '#gfx_max_dequeued_textures_per_frame_enabled',
        '#gfx_max_dequeued_textures_per_frame_steps',
        '#gfx_max_dequeued_textures_per_frame_text_value',
        '#crossplatform_toggle',
        '#crossplatform_toggle_enabled',
        '#only_trusted_skins_allowed',
        '#only_trusted_skins_allowed_enabled',
        '#terms_and_conditions_hyperlink',
        // +1.15/+1.16
        '#has_persona_reward',
        '#demo_choice_visible',
        '#sign_in_ios_buttons_visible',
        '#supports_netherite',
        '#keyboard_button_visible',
        '#send_button_accessibility_text',
        '#open_uri_button_visible',
        '#service_body_text',
        '#service_button_visible',
        '#button_count',
        '#emote_name',
        '#is_touch_mode',
        '#emote_name_touch',
        '#emote_is_valid',
        '#emote_image',
        '#emote_image_file_system',
        '#emote_image_tint',
        '#image_is_valid',
        '#emote_index_name',
        '#button_panel_purchase_disallowed',
        '#gamepad_helper_rs_visible',
        '#crafting_label_text',
        '#no_xbox_live_friends_text',
        '#target_pool_text_box_value',
        '#name_text_box_value',
        '#target_text_box_value',
        '#final_block_text_box_value',
        '#joint_type_toggle_state',
        '#command_identifier',
        '#add_command_focus_override_up',
        '#command_focus_override_down',
        '#button_name_identifier',
        '#button_name_focus_override_up',
        '#button_mode_identifier',
        '#button_mode_focus_override_up',
        '#loading_patch_notes',
        '#sunsetting_do_not_show_again',
        '#interation_button_enabled',
        '#interaction_button_visible',
        '#skin_pack_section_visible',
        '#update_notification_visible',
        '#realms_incompatible_button_visible',
        '#rtx_label_visible',
        '#item_realms_expiration_label',
        '#ratings_button_enabled',
        '#rating_footer_text',
        '#ratings_interact_panel_visible',
        '#user_rating_star_texture',
        '#interact_button_text',
        '#exit_world_button_visible',
        '#purchase_panel_visible_disallowed',
        '#kick_button_visible',
        '#kick_button_enabled',
        '#ban_button_visible',
        '#ban_button_enabled',
        '#permission_options_grid_visible',
        '#achievement_offer_lock_state_texture',
        '#color_selected',
        '#is_skin_realms_plus',
        '#is_piece_visible',
        '#category_section_content',
        '#owned_packs_selected',
        '#purchasable_packs_selected',
        '#is_realms_plus_enabled',
        '#realms_plus_packs_selected',
        '#is_play_again_button_enabled',
        '#is_emote_offer_list_visible',
        '#is_emotes_section_visible',
        '#is_achievement_award',
        '#is_right_info_with_buttons_visible',
        '#active_skin_name',
        '#current_skin_name',
        '#is_using_dressing_room_debugging',
        '#preview_skin_name',
        '#skin_color_option_enabled',
        '#can_paperdoll_rotate',
        '#can_collect_achievement_award',
        '#is_offer_achievement',
        '#color_picker_info_panel_title_color',
        '#color_picker_info_panel_title_name',
        '#realms_plus_skin_pack_timer',
        '#has_realms_plus_timer',
        '#show_realms_plus_button',
        '#is_classic_skin_section_visible',
        '#is_none_emote_option_enabled',
        '#persona_is_updating',
        '#is_third_party_server_selected',
        '#is_additional_server_selected',
        '#add_server_info_visible',
        '#feature_server_message_text',
        '#device_sunsetting',
        '#is_additional_server_label_visible',
        '#featured_servers_visible_and_available',
        '#beta_retail_legacy_worlds_visible',
        '#beta_retail_local_worlds_visible',
        '#is_server_info_available_collection',
        '#toggle_state',
        '#add_server_enabled',
        '#beta_retail_legacy_world_item_grid_dimension',
        '#beta_retail_local_world_item_grid_dimension',
        '#realms_chevron_visible',
        '#news_is_read_more',
        '#news_is_read_less',
        '#news_label',
        '#news_text',
        '#games_collection_length',
        '#available_game_description',
        '#available_game_title',
        '#available_game_subtitle',
        '#available_game_image',
        '#available_game_image_visible',
        '#description_is_read_more',
        '#description_is_read_less',
        '#description_label',
        '#screenshot_collection_length',
        '#this_screenshot_selected',
        '#server_has_news',
        '#server_has_games',
        '#server_has_description',
        '#server_has_screenshots',
        '#info_third_party_server_name',
        '#info_third_party_server_logo_texture_path',
        '#info_third_party_screenshot_visible',
        '#is_server_info_available',
        '#info_additional_server_name',
        '#deep_link_profile_loading_visible',
        '#enable_achievement_button',
        '#selected_skin_name',
        '#selected_skin',
        '#valid_skin_offer_index',
        '#is_loading_outline_visible',
        '#skin_pack_loading_progress_visible',
        '#buy_game_visible',
        '#this_page_selected',
        '#offer_collection_visible',
        '#timer_duration',
        '#is_hero_carousel_visible',
        '#carousel_section_content',
        '#grey_bar_section_content',
        '#banner_button_text',
        '#promo_page_is_ready',
        '#banner_title_text',
        '#banner_description_text',
        '#offer_collection_ready',
        '#is_search_offer_list_visible',
        '#item_description_text',
        '#item_description_color',
        '#item_title_text',
        '#item_timer_visible',
        '#item_timer_text',
        '#item_creator_text',
        '#item_is_world',
        '#pdp_button_text',
        '#item_is_not_owned',
        '#item_full_price',
        '#item_action_button_text',
        '#screenshot_location',
        '#character_loading_in_progress',
        '#cycle_promotions_left_button_enabled',
        '#cycle_promotions_right_button_enabled',
        '#end_of_week_offer_panel_visible',
        '#promotion_last_week_day_text',
        '#is_valid',
        '#promotion_day_text',
        '#this_promo_selected',
        '#item_has_been_claimed',
        '#promotion_thumbnail_texture_path',
        '#promotion_thumbnail_texture_file_system',
        '#promotion_offer_gift_image',
        '#promotion_offer_visible',
        '#price_info_visible',
        '#inventory_section_content',
        '#realms_enabled',
        '#collection_count',
        '#subcategories_visible',
        '#bounding_toggle_visible',
        '#corner_mode_panel_visible',
        '#corner_text_visible',
        '#rotation_arrows_visible',
        '#service_image_texture_filename',
        '#service_image_texture_location',
        '#service_image_repo_ready',
        '#inventory_selected_item_lock_in_inventory',
        '#item_lock',
        '#item_lock_in_slot',
        '#item_lodestone_tracking_handle',
        '#item_lock_in_inventory',
        '#inventory_selected_item_lock_in_slot',
        '#are_world_list_grids_ready',
        '#realms_plus_one_month_free_trial_not_visible',
        '#free_trial_header_text',
        '#landing_info_line_4',
        '#realm_description_enabled',
        '#realm_description_visible',
        '#realm_description',
        '#dev_progression_id',
        '#dev_progression_id_enabled',
        '#dev_show_override_progressions',
        '#dev_show_override_progressions_enabled',
        '#camera_shake',
        '#camera_shake_enabled',
        '#graphics_upscaling',
        '#graphics_upscaling_enabled',
        '#raytracing',
        '#raytracing_enabled',
        '#raytracing_render_distance_slider_label',
        '#raytracing_render_distance',
        '#raytracing_render_distance_text_value',
        '#raytracing_render_distance_enabled',
        '#raytracing_render_distance_steps',
        '#show_render_distance',
        '#rtx_render_distance_warning_visible',
        '#pad_visible',
        '#right_button_visible',
        '#consumable_not_extendable_visible',
        '#my_subscriptions_visible',
        '#available_or_additional_subscriptions_text',
        '#vr_variable_snap_angle',
        '#vr_variable_snap_angle_enabled',
        '#vr_snap_sound',
        '#vr_snap_sound_enabled',
        '#vr_movement_dropdown_enabled',
        '#vr_movement_dropdown_toggle_label',
        '#vr_jump_dropdown_enabled',
        '#vr_jump_dropdown_toggle_label',
        '#vr_head_steering_dropdown_enabled',
        '#vr_head_steering_dropdown_toggle_label',
        '#vr_sticky_mining_dropdown_enabled',
        '#vr_sticky_mining_dropdown_toggle_label',
        '#vr_hud_position_dropdown_enabled',
        '#vr_hud_position_dropdown_toggle_label',
        '#vr_hud_distance_slider_label',
        '#vr_hud_distance',
        '#vr_hud_distance_text_value',
        '#vr_hud_distance_enabled',
        '#vr_camera_movement_radio_snap',
        '#vr_camera_movement_radio_classic',
        '#vr_camera_movement_radio_wheel',
        '#vr_camera_movement_radio_snap_wheel',
        '#vr_movement_radio_linear',
        '#vr_movement_radio_classic',
        '#vr_jump_radio_linear',
        '#vr_jump_radio_classic',
        '#vr_head_steering_radio_gaze',
        '#vr_head_steering_radio_player',
        '#vr_sticky_mining_radio_lock',
        '#vr_sticky_mining_radio_controller',
        '#vr_sticky_mining_radio_disabled',
        '#vr_hud_position_radio_drift',
        '#vr_hud_position_radio_offhand',
        '#vr_hud_position_radio_fixed',
        '#not_hide_chat',
        '#texttospeech_volume_slider_label',
        '#texttospeech_volume',
        '#texttospeech_volume_text_value',
        '#texttospeech_volume_enabled',
        '#text_background_opacity_slider_label',
        '#text_background_opacity',
        '#text_background_opacity_text_value',
        '#text_background_opacity_enabled',
        '#main_volume_slider_label',
        '#main_volume',
        '#main_volume_text_value',
        '#main_volume_enabled',
        '#ambient_volume_slider_label',
        '#ambient_volume',
        '#ambient_volume_text_value',
        '#ambient_volume_enabled',
        '#hostile_volume_slider_label',
        '#hostile_volume',
        '#hostile_volume_text_value',
        '#hostile_volume_enabled',
        '#neutral_volume_slider_label',
        '#neutral_volume',
        '#neutral_volume_text_value',
        '#neutral_volume_enabled',
        '#record_volume_slider_label',
        '#record_volume',
        '#record_volume_text_value',
        '#record_volume_enabled',
        '#dev_override_xbox_sandbox',
        '#dev_override_xbox_sandbox_enabled',
        '#override_xbox_sandbox_on_windows',
        '#dev_xbox_environment_dropdown_toggle_label',
        '#dev_xbox_environment_dropdown_enabled',
        '#override_xbox_sandbox_visible',
        '#progressions_grid_dimension',
        '#dev_display_progressions_panel',
        '#progression_id',
        '#test_assets.azure_shared_access_signature',
        '#automation_server_test_tags',
        '#automation_broken_functional_test_tags',
        '#automation_broken_server_test_tags',
        '#automation_broken_unit_test_tags',
        '#automation_soak_test_duration_minutes',
        '#remote_imgui',
        '#remote_imgui_enabled',
        '#dev_render_mob_info_state',
        '#dev_render_mob_info_state_enabled',
        '#dev_edu_demo',
        '#dev_edu_demo_enabled',
        '#enable_texture_hot_reloader',
        '#texture_hot_reloader_enabled',
        '#dev_discovery_environment_dropdown_toggle_label',
        '#dev_discovery_environment_dropdown_enabled',
        '#dev_use_sunset_overrides',
        '#dev_use_sunset_overrides_enabled',
        '#sunsetting_override_enabled',
        '#dev_sunsetting_tier_dropdown_toggle_label',
        '#dev_sunsetting_tier_dropdown_enabled',
        '#dev_sunset_state',
        '#dev_sunset_state_enabled',
        '#initial_selected',
        '#ui_feature_toggle_count',
        '#core_ui_enabled',
        '#dev_new_achievements_screens_radio_dimension',
        '#dev_display_progressions_panel_enabled',
        '#show_raytracing_render_distance',
        '#realm_price_loaded',
        '#vr_camera_moement_dropdown_enabled',
        '#vr_camera_movement_dropdown_toggle_label',
        '#vr_snap_angle_slider_label',
        '#vr_snap_angle',
        '#vr_snap_angle_text_value',
        '#vr_snap_angle_enabled',
        '#vr_snap_angle_steps',
        '#dev_display_mock_http_panel',
        '#rule_details_label',
        '#mock_http_rule_count',
        // +1.17
        '#sign_in_error_visible',
        '#sign_in_error_client_visible',
        '#pack_progress_visible',
        '#welcome_visible',
        '#demo_visible',
        '#loading_text',
        '#debug_json_popup_enabled',
        '#popup_has_two_buttons',
        '#progress_loading_visible',
        '#realm_slot_is_filled',
        '#slot_world_image',
        '#slot_world_texture_source',
        '#slot_name',
        '#slots_view_toggle',
        '#upload_in_progress',
        '#cloud_upload_terms_accepted',
        '#interact_visible',
        '#is_gamepad_tip',
        '#gamepad_postfix_text',
        '#left_tips_visible',
        '#left_tip_background',
        '#on_enter_enabled',
        '#on_exit_enabled',
        '#patch_link_button_text',
        '#paper_doll_skin',
        '#store_button_visible',
        '#show_equip_button_helper',
        '#is_see_pack_in_store_button_visible',
        '#color_equipped',
        '#is_category_toggle_selected',
        '#realms_sign_in_prompt',
        '#realms_sign_in_prompt_friends',
        '#realms_sign_in_button_visible',
        '#view_offers_visible',
        '#cloud_upload_enabled',
        '#create_on_realms_button_visible',
        '#no_pics_alert_visibility',
        '#right_photo_visibility',
        '#left_photo_visibility',
        '#no_pick_photos_alert_visibility',
        '#spinner_animation_visible',
        '#create_button_visible',
        '#slot_image_visible',
        '#slot_edit_buttons_toggle',
        '#slot_is_current_world',
        '#new_slot_label',
        '#slot_is_filled',
        '#world_slot_name',
        '#world_slot_type',
        '#warning_text_visible',
        '#world_image',
        '#sidebar_verbose_toggle_check',
        '#sidebar_option_toggle_check',
        '#is_screen_nav_button_visible',
        '#is_verbose_sidebar_nav_button_visible',
        '#is_sidebar_nav_ready',
        '#is_simple_sidebar_state_active',
        '#sidebar_sections',
        '#is_sidebar_nav_visible',
        '#is_controller_hover_visible',
        '#page_loading_finished',
        '#simple_sidebar_option_toggle_check',
        '#verbose_sidebar_option_toggle_check',
        '#achievements_icon_visible',
        '#toolbox_button_visible',
        '#swap_vr_keyboard_helper_visible',
        '#cloud_upload_do_not_show_again',
        '#is_top_row_button_focus_enabled',
        '#store_failure_code',
        '#banner_texture_name',
        '#banner_texture_filepath',
        '#title_text_color',
        '#day_four_string',
        '#animation_mode_dropdown_enabled',
        '#animation_mode_dropdown_toggle_label',
        '#toast_font_type'
      ]
    }
  },
  additionalProperties: false,
  properties: {
    namespace: {
      description: 'Identifier for the file. It must be unique and must be different from the vanilla namespaces.',
      type: 'string',
      minLength: 1
    }
  },
  patternProperties: {
    '^[a-zA-Z0-9:\\-_]+(@([a-zA-Z0-9:\\-_]+\\.)?[a-zA-Z0-9:\\-_]+)?$': {
      $ref: '#/definitions/ui_control'
    }
  }
};
