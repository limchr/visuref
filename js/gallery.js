// gallery.js - Gallery data structure with grouped images (supports nested groups)
export const galleryGroups = [
  {
    group_name: "Simple Shapes Renderings",
    group_thumbnail_index: 0,
    images: [
      {
        title: "Sphere",
        file_path: "data/image_gallery/simple_shapes/sphere.jpg",
        info: "Basic sphere rendering for studying form and light"
      },
      {
        title: "Sphere & Cube",
        file_path: "data/image_gallery/simple_shapes/sphere_cube.jpg",
        info: "Combination of basic geometric forms"
      },
      {
        title: "Three Basic Shapes",
        file_path: "data/image_gallery/simple_shapes/sphere_cube_cylinder.jpg",
        info: "Sphere, cube, and cylinder together"
      },
      {
        title: "Ellipsoid",
        file_path: "data/image_gallery/simple_shapes/ellipsoid_flat.jpg",
        info: "Elongated sphere for studying stretched forms"
      },
      {
        title: "Long Ellipsoid",
        file_path: "data/image_gallery/simple_shapes/ellipsoid_long.jpg",
        info: "Extended ellipsoid shape"
      },
      {
        title: "Complex Scene",
        file_path: "data/image_gallery/simple_shapes/complex_scene.jpg",
        info: "Multiple objects in a complex arrangement"
      },
      {
        title: "Suzanne (Blender Monkey)",
        file_path: "data/image_gallery/simple_shapes/monkey_suzanne.jpg",
        info: "Blender's mascot for studying organic forms"
      }
    ]
  },

  {
    group_name: "Draft Pencil Sketches",
    group_thumbnail_index: 0,
    subgroups: [
      {
        group_name: "Human Figures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Female figure sitting on a chair, side view, natural pose",
            file_path: "data/image_gallery/sketch/Human Figures/female_figure_sitting_chair_sideview.jpg",
            info: "Female figure sitting on a chair, side view, natural pose"
          },
          {
            title: "Male figure walking mid-step, streetwear clothing",
            file_path: "data/image_gallery/sketch/Human Figures/male_figure_walking_streetwear.jpg",
            info: "Male figure walking mid-step, streetwear clothing"
          },
          {
            title: "Dancer in motion, flowing dress, soft lighting",
            file_path: "data/image_gallery/sketch/Human Figures/dancer_in_motion_flowing_dress.jpg",
            info: "Dancer in motion, flowing dress, soft lighting"
          },
          {
            title: "Person holding umbrella, rainy day",
            file_path: "data/image_gallery/sketch/Human Figures/person_holding_umbrella_rain.jpg",
            info: "Person holding umbrella, rainy day"
          }
        ]
      },
      {
        group_name: "Portraits",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Male portrait, dramatic side lighting",
            file_path: "data/image_gallery/sketch/Portraits/male_portrait_dramatic_lighting.jpg",
            info: "Male portrait, dramatic side lighting"
          },
          {
            title: "Old man with wrinkles, character portrait",
            file_path: "data/image_gallery/sketch/Portraits/old_man_wrinkled_portrait.jpg",
            info: "Old man with wrinkles, character portrait"
          },
          {
            title: "Figure in candlelight, chiaroscuro",
            file_path: "data/image_gallery/sketch/Portraits/figure_in_candlelight_chiaroscuro.jpg",
            info: "Figure in candlelight, chiaroscuro"
          },
          {
            title: "Portrait lit from below",
            file_path: "data/image_gallery/sketch/Portraits/portrait_lit_from_below.jpg",
            info: "Portrait lit from below"
          },
          {
            title: "Person under streetlamp at night",
            file_path: "data/image_gallery/sketch/Portraits/person_under_streetlamp_night.jpg",
            info: "Person under streetlamp at night"
          }
        ]
      },
      {
        group_name: "Facial Expressions",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Smile with teeth, natural lighting",
            file_path: "data/image_gallery/sketch/Facial Expressions/smile_with_teeth.jpg",
            info: "Smile with teeth, natural lighting"
          },
          {
            title: "Sad face, teary eyes",
            file_path: "data/image_gallery/sketch/Facial Expressions/sad_face_teary_eyes.jpg",
            info: "Sad face, teary eyes"
          },
          {
            title: "Shocked expression, mouth open",
            file_path: "data/image_gallery/sketch/Facial Expressions/shocked_expression_open_mouth.jpg",
            info: "Shocked expression, mouth open"
          },
          {
            title: "Confused face, head tilted",
            file_path: "data/image_gallery/sketch/Facial Expressions/confused_face_head_tilted.jpg",
            info: "Confused face, head tilted"
          },
          {
            title: "Crying face, soft lighting",
            file_path: "data/image_gallery/sketch/Facial Expressions/crying_face_soft_lighting.jpg",
            info: "Crying face, soft lighting"
          },
          {
            title: "Mischievous smile",
            file_path: "data/image_gallery/sketch/Facial Expressions/mischievous_smile.jpg",
            info: "Mischievous smile"
          }
        ]
      },
      {
        group_name: "Hands and Gestures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Two hands interacting with each other",
            file_path: "data/image_gallery/sketch/Hands and Gestures/two_hands_interacting.jpg",
            info: "Two hands interacting with each other"
          },
          {
            title: "Hand gripping a cup",
            file_path: "data/image_gallery/sketch/Hands and Gestures/hand_gripping_cup.jpg",
            info: "Hand gripping a cup"
          },
          {
            title: "Child's hand holding an adult's finger",
            file_path: "data/image_gallery/sketch/Hands and Gestures/child_hand_holding_adult_finger.jpg",
            info: "Child's hand holding an adult's finger"
          },
          {
            title: "Hand holding a small flower",
            file_path: "data/image_gallery/sketch/Hands and Gestures/hand_holding_flower.jpg",
            info: "Hand holding a small flower"
          }
        ]
      },
      {
        group_name: "Architectural and Environmental Scenes",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Street alley, one-point perspective",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/street_alley_one_point_perspective.jpg",
            info: "Street alley, one-point perspective"
          },
          {
            title: "Interior hallway, strong vanishing point",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/interior_hallway_vanishing_point.jpg",
            info: "Interior hallway, strong vanishing point"
          },
          {
            title: "Bridge crossing river, aerial view",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/bridge_crossing_river_aerial.jpg",
            info: "Bridge crossing river, aerial view"
          },
          {
            title: "Mountain valley, fog layers",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/mountain_valley_fog_layers.jpg",
            info: "Mountain valley, fog layers"
          },
          {
            title: "Urban intersection at night",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/urban_intersection_night.jpg",
            info: "Urban intersection at night"
          },
          {
            title: "Alleyway with strong shadows",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/alleyway_strong_shadows.jpg",
            info: "Alleyway with strong shadows"
          },
          {
            title: "Looking up at tall buildings",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/looking_up_tall_buildings.jpg",
            info: "Looking up at tall buildings"
          },
          {
            title: "Low-key lighting, dramatic mood",
            file_path: "data/image_gallery/sketch/Architectural and Environmental Scenes/low_key_dramatic_mood.jpg",
            info: "Low-key lighting, dramatic mood"
          }
        ]
      },
      {
        group_name: "Objects and Still Life",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Hanging lanterns at night",
            file_path: "data/image_gallery/sketch/Objects and Still Life/hanging_lanterns_night.jpg",
            info: "Hanging lanterns at night"
          },
          {
            title: "Japanese torii gate",
            file_path: "data/image_gallery/sketch/Objects and Still Life/japanese_torii_gate.jpg",
            info: "Japanese torii gate"
          },
          {
            title: "Ancient temple ruins",
            file_path: "data/image_gallery/sketch/Objects and Still Life/ancient_temple_ruins.jpg",
            info: "Ancient temple ruins"
          },
          {
            title: "Coffee cup on table",
            file_path: "data/image_gallery/sketch/Objects and Still Life/coffee_cup_on_table.jpg",
            info: "Coffee cup on table"
          },
          {
            title: "Fruit bowl still life",
            file_path: "data/image_gallery/sketch/Objects and Still Life/fruit_bowl_still_life.jpg",
            info: "Fruit bowl still life"
          },
          {
            title: "Clock tower in sunset light",
            file_path: "data/image_gallery/sketch/Objects and Still Life/clock_tower_sunset.jpg",
            info: "Clock tower in sunset light"
          },
          {
            title: "Flower vase on window sill",
            file_path: "data/image_gallery/sketch/Objects and Still Life/flower_vase_window_sill.jpg",
            info: "Flower vase on window sill"
          },
          {
            title: "Vintage camera on desk",
            file_path: "data/image_gallery/sketch/Objects and Still Life/vintage_camera_on_desk.jpg",
            info: "Vintage camera on desk"
          },
          {
            title: "Tea set with steam rising",
            file_path: "data/image_gallery/sketch/Objects and Still Life/tea_set_with_steam.jpg",
            info: "Tea set with steam rising"
          },
          {
            title: "Apple and glass cup still life",
            file_path: "data/image_gallery/sketch/Objects and Still Life/apple_and_glass_still_life.jpg",
            info: "Apple and glass cup still life"
          },
          {
            title: "Ceramic vase with shadows",
            file_path: "data/image_gallery/sketch/Objects and Still Life/ceramic_vase_shadows.jpg",
            info: "Ceramic vase with shadows"
          },
          {
            title: "Forest clearing, morning fog",
            file_path: "data/image_gallery/sketch/Objects and Still Life/forest_clearing_morning_fog.jpg",
            info: "Forest clearing, morning fog"
          }
        ]
      },
      {
        group_name: "Animals",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Squirrel eating nut",
            file_path: "data/image_gallery/sketch/Animals/squirrel_eating_nut.jpg",
            info: "Squirrel eating nut"
          },
          {
            title: "Elephant side profile, savanna",
            file_path: "data/image_gallery/sketch/Animals/elephant_side_profile_savanna.jpg",
            info: "Elephant side profile, savanna"
          },
          {
            title: "Dog looking up, portrait view",
            file_path: "data/image_gallery/sketch/Animals/dog_portrait_looking_up.jpg",
            info: "Dog looking up, portrait view"
          },
          {
            title: "Cat stretching",
            file_path: "data/image_gallery/sketch/Animals/cat_stretching.jpg",
            info: "Cat stretching"
          },
          {
            title: "Cat sleeping in sunlight",
            file_path: "data/image_gallery/sketch/Animals/cat_sleeping_sunlight.jpg",
            info: "Cat sleeping in sunlight"
          },
          {
            title: "Dog running across grass",
            file_path: "data/image_gallery/sketch/Animals/dog_running_across_grass.jpg",
            info: "Dog running across grass"
          },
          {
            title: "Lion resting under tree",
            file_path: "data/image_gallery/sketch/Animals/lion_resting_under_tree.jpg",
            info: "Lion resting under tree"
          }
        ]
      }
    ]
  },


  {
    group_name: "Realistic Pencil Drawings",
    group_thumbnail_index: 0,
    subgroups: [
      {
        group_name: "Human Figures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Female figure sitting on a chair, side view, natural pose",
            file_path: "data/image_gallery/pencil/Human Figures/female_figure_sitting_chair_sideview.jpg",
            info: "Female figure sitting on a chair, side view, natural pose"
          },
          {
            title: "Male figure walking mid-step, streetwear clothing",
            file_path: "data/image_gallery/pencil/Human Figures/male_figure_walking_streetwear.jpg",
            info: "Male figure walking mid-step, streetwear clothing"
          },
          {
            title: "Dancer in motion, flowing dress, soft lighting",
            file_path: "data/image_gallery/pencil/Human Figures/dancer_in_motion_flowing_dress.jpg",
            info: "Dancer in motion, flowing dress, soft lighting"
          },
          {
            title: "Person holding umbrella, rainy day",
            file_path: "data/image_gallery/pencil/Human Figures/person_holding_umbrella_rain.jpg",
            info: "Person holding umbrella, rainy day"
          }
        ]
      },
      {
        group_name: "Portraits",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Male portrait, dramatic side lighting",
            file_path: "data/image_gallery/pencil/Portraits/male_portrait_dramatic_lighting.jpg",
            info: "Male portrait, dramatic side lighting"
          },
          {
            title: "Old man with wrinkles, character portrait",
            file_path: "data/image_gallery/pencil/Portraits/old_man_wrinkled_portrait.jpg",
            info: "Old man with wrinkles, character portrait"
          },
          {
            title: "Figure in candlelight, chiaroscuro",
            file_path: "data/image_gallery/pencil/Portraits/figure_in_candlelight_chiaroscuro.jpg",
            info: "Figure in candlelight, chiaroscuro"
          },
          {
            title: "Portrait lit from below",
            file_path: "data/image_gallery/pencil/Portraits/portrait_lit_from_below.jpg",
            info: "Portrait lit from below"
          },
          {
            title: "Person under streetlamp at night",
            file_path: "data/image_gallery/pencil/Portraits/person_under_streetlamp_night.jpg",
            info: "Person under streetlamp at night"
          }
        ]
      },
      {
        group_name: "Facial Expressions",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Smile with teeth, natural lighting",
            file_path: "data/image_gallery/pencil/Facial Expressions/smile_with_teeth.jpg",
            info: "Smile with teeth, natural lighting"
          },
          {
            title: "Sad face, teary eyes",
            file_path: "data/image_gallery/pencil/Facial Expressions/sad_face_teary_eyes.jpg",
            info: "Sad face, teary eyes"
          },
          {
            title: "Shocked expression, mouth open",
            file_path: "data/image_gallery/pencil/Facial Expressions/shocked_expression_open_mouth.jpg",
            info: "Shocked expression, mouth open"
          },
          {
            title: "Confused face, head tilted",
            file_path: "data/image_gallery/pencil/Facial Expressions/confused_face_head_tilted.jpg",
            info: "Confused face, head tilted"
          },
          {
            title: "Crying face, soft lighting",
            file_path: "data/image_gallery/pencil/Facial Expressions/crying_face_soft_lighting.jpg",
            info: "Crying face, soft lighting"
          },
          {
            title: "Mischievous smile",
            file_path: "data/image_gallery/pencil/Facial Expressions/mischievous_smile.jpg",
            info: "Mischievous smile"
          }
        ]
      },
      {
        group_name: "Hands and Gestures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Two hands interacting with each other",
            file_path: "data/image_gallery/pencil/Hands and Gestures/two_hands_interacting.jpg",
            info: "Two hands interacting with each other"
          },
          {
            title: "Hand gripping a cup",
            file_path: "data/image_gallery/pencil/Hands and Gestures/hand_gripping_cup.jpg",
            info: "Hand gripping a cup"
          },
          {
            title: "Child's hand holding an adult's finger",
            file_path: "data/image_gallery/pencil/Hands and Gestures/child_hand_holding_adult_finger.jpg",
            info: "Child's hand holding an adult's finger"
          },
          {
            title: "Hand holding a small flower",
            file_path: "data/image_gallery/pencil/Hands and Gestures/hand_holding_flower.jpg",
            info: "Hand holding a small flower"
          }
        ]
      },
      {
        group_name: "Architectural and Environmental Scenes",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Street alley, one-point perspective",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/street_alley_one_point_perspective.jpg",
            info: "Street alley, one-point perspective"
          },
          {
            title: "Interior hallway, strong vanishing point",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/interior_hallway_vanishing_point.jpg",
            info: "Interior hallway, strong vanishing point"
          },
          {
            title: "Bridge crossing river, aerial view",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/bridge_crossing_river_aerial.jpg",
            info: "Bridge crossing river, aerial view"
          },
          {
            title: "Mountain valley, fog layers",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/mountain_valley_fog_layers.jpg",
            info: "Mountain valley, fog layers"
          },
          {
            title: "Urban intersection at night",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/urban_intersection_night.jpg",
            info: "Urban intersection at night"
          },
          {
            title: "Alleyway with strong shadows",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/alleyway_strong_shadows.jpg",
            info: "Alleyway with strong shadows"
          },
          {
            title: "Looking up at tall buildings",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/looking_up_tall_buildings.jpg",
            info: "Looking up at tall buildings"
          },
          {
            title: "Low-key lighting, dramatic mood",
            file_path: "data/image_gallery/pencil/Architectural and Environmental Scenes/low_key_dramatic_mood.jpg",
            info: "Low-key lighting, dramatic mood"
          }
        ]
      },
      {
        group_name: "Objects and Still Life",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Hanging lanterns at night",
            file_path: "data/image_gallery/pencil/Objects and Still Life/hanging_lanterns_night.jpg",
            info: "Hanging lanterns at night"
          },
          {
            title: "Japanese torii gate",
            file_path: "data/image_gallery/pencil/Objects and Still Life/japanese_torii_gate.jpg",
            info: "Japanese torii gate"
          },
          {
            title: "Ancient temple ruins",
            file_path: "data/image_gallery/pencil/Objects and Still Life/ancient_temple_ruins.jpg",
            info: "Ancient temple ruins"
          },
          {
            title: "Coffee cup on table",
            file_path: "data/image_gallery/pencil/Objects and Still Life/coffee_cup_on_table.jpg",
            info: "Coffee cup on table"
          },
          {
            title: "Fruit bowl still life",
            file_path: "data/image_gallery/pencil/Objects and Still Life/fruit_bowl_still_life.jpg",
            info: "Fruit bowl still life"
          },
          {
            title: "Clock tower in sunset light",
            file_path: "data/image_gallery/pencil/Objects and Still Life/clock_tower_sunset.jpg",
            info: "Clock tower in sunset light"
          },
          {
            title: "Flower vase on window sill",
            file_path: "data/image_gallery/pencil/Objects and Still Life/flower_vase_window_sill.jpg",
            info: "Flower vase on window sill"
          },
          {
            title: "Vintage camera on desk",
            file_path: "data/image_gallery/pencil/Objects and Still Life/vintage_camera_on_desk.jpg",
            info: "Vintage camera on desk"
          },
          {
            title: "Tea set with steam rising",
            file_path: "data/image_gallery/pencil/Objects and Still Life/tea_set_with_steam.jpg",
            info: "Tea set with steam rising"
          },
          {
            title: "Apple and glass cup still life",
            file_path: "data/image_gallery/pencil/Objects and Still Life/apple_and_glass_still_life.jpg",
            info: "Apple and glass cup still life"
          },
          {
            title: "Ceramic vase with shadows",
            file_path: "data/image_gallery/pencil/Objects and Still Life/ceramic_vase_shadows.jpg",
            info: "Ceramic vase with shadows"
          },
          {
            title: "Forest clearing, morning fog",
            file_path: "data/image_gallery/pencil/Objects and Still Life/forest_clearing_morning_fog.jpg",
            info: "Forest clearing, morning fog"
          }
        ]
      },
      {
        group_name: "Animals",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Squirrel eating nut",
            file_path: "data/image_gallery/pencil/Animals/squirrel_eating_nut.jpg",
            info: "Squirrel eating nut"
          },
          {
            title: "Elephant side profile, savanna",
            file_path: "data/image_gallery/pencil/Animals/elephant_side_profile_savanna.jpg",
            info: "Elephant side profile, savanna"
          },
          {
            title: "Dog looking up, portrait view",
            file_path: "data/image_gallery/pencil/Animals/dog_portrait_looking_up.jpg",
            info: "Dog looking up, portrait view"
          },
          {
            title: "Cat stretching",
            file_path: "data/image_gallery/pencil/Animals/cat_stretching.jpg",
            info: "Cat stretching"
          },
          {
            title: "Cat sleeping in sunlight",
            file_path: "data/image_gallery/pencil/Animals/cat_sleeping_sunlight.jpg",
            info: "Cat sleeping in sunlight"
          },
          {
            title: "Dog running across grass",
            file_path: "data/image_gallery/pencil/Animals/dog_running_across_grass.jpg",
            info: "Dog running across grass"
          },
          {
            title: "Lion resting under tree",
            file_path: "data/image_gallery/pencil/Animals/lion_resting_under_tree.jpg",
            info: "Lion resting under tree"
          }
        ]
      }
    ]
  },
  {
    group_name: "Watercolor Paintings",
    group_thumbnail_index: 0,
    subgroups: [
      {
        group_name: "Human Figures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Female figure sitting on a chair, side view, natural pose",
            file_path: "data/image_gallery/watercolor/Human Figures/female_figure_sitting_chair_sideview.jpg",
            info: "Female figure sitting on a chair, side view, natural pose"
          },
          {
            title: "Male figure walking mid-step, streetwear clothing",
            file_path: "data/image_gallery/watercolor/Human Figures/male_figure_walking_streetwear.jpg",
            info: "Male figure walking mid-step, streetwear clothing"
          },
          {
            title: "Dancer in motion, flowing dress, soft lighting",
            file_path: "data/image_gallery/watercolor/Human Figures/dancer_in_motion_flowing_dress.jpg",
            info: "Dancer in motion, flowing dress, soft lighting"
          },
          {
            title: "Person holding umbrella, rainy day",
            file_path: "data/image_gallery/watercolor/Human Figures/person_holding_umbrella_rain.jpg",
            info: "Person holding umbrella, rainy day"
          }
        ]
      },
      {
        group_name: "Portraits",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Male portrait, dramatic side lighting",
            file_path: "data/image_gallery/watercolor/Portraits/male_portrait_dramatic_lighting.jpg",
            info: "Male portrait, dramatic side lighting"
          },
          {
            title: "Old man with wrinkles, character portrait",
            file_path: "data/image_gallery/watercolor/Portraits/old_man_wrinkled_portrait.jpg",
            info: "Old man with wrinkles, character portrait"
          },
          {
            title: "Figure in candlelight, chiaroscuro",
            file_path: "data/image_gallery/watercolor/Portraits/figure_in_candlelight_chiaroscuro.jpg",
            info: "Figure in candlelight, chiaroscuro"
          },
          {
            title: "Portrait lit from below",
            file_path: "data/image_gallery/watercolor/Portraits/portrait_lit_from_below.jpg",
            info: "Portrait lit from below"
          },
          {
            title: "Person under streetlamp at night",
            file_path: "data/image_gallery/watercolor/Portraits/person_under_streetlamp_night.jpg",
            info: "Person under streetlamp at night"
          }
        ]
      },
      {
        group_name: "Facial Expressions",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Smile with teeth, natural lighting",
            file_path: "data/image_gallery/watercolor/Facial Expressions/smile_with_teeth.jpg",
            info: "Smile with teeth, natural lighting"
          },
          {
            title: "Sad face, teary eyes",
            file_path: "data/image_gallery/watercolor/Facial Expressions/sad_face_teary_eyes.jpg",
            info: "Sad face, teary eyes"
          },
          {
            title: "Shocked expression, mouth open",
            file_path: "data/image_gallery/watercolor/Facial Expressions/shocked_expression_open_mouth.jpg",
            info: "Shocked expression, mouth open"
          },
          {
            title: "Confused face, head tilted",
            file_path: "data/image_gallery/watercolor/Facial Expressions/confused_face_head_tilted.jpg",
            info: "Confused face, head tilted"
          },
          {
            title: "Crying face, soft lighting",
            file_path: "data/image_gallery/watercolor/Facial Expressions/crying_face_soft_lighting.jpg",
            info: "Crying face, soft lighting"
          },
          {
            title: "Mischievous smile",
            file_path: "data/image_gallery/watercolor/Facial Expressions/mischievous_smile.jpg",
            info: "Mischievous smile"
          }
        ]
      },
      {
        group_name: "Hands and Gestures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Two hands interacting with each other",
            file_path: "data/image_gallery/watercolor/Hands and Gestures/two_hands_interacting.jpg",
            info: "Two hands interacting with each other"
          },
          {
            title: "Hand gripping a cup",
            file_path: "data/image_gallery/watercolor/Hands and Gestures/hand_gripping_cup.jpg",
            info: "Hand gripping a cup"
          },
          {
            title: "Child's hand holding an adult's finger",
            file_path: "data/image_gallery/watercolor/Hands and Gestures/child_hand_holding_adult_finger.jpg",
            info: "Child's hand holding an adult's finger"
          },
          {
            title: "Hand holding a small flower",
            file_path: "data/image_gallery/watercolor/Hands and Gestures/hand_holding_flower.jpg",
            info: "Hand holding a small flower"
          }
        ]
      },
      {
        group_name: "Architectural and Environmental Scenes",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Street alley, one-point perspective",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/street_alley_one_point_perspective.jpg",
            info: "Street alley, one-point perspective"
          },
          {
            title: "Interior hallway, strong vanishing point",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/interior_hallway_vanishing_point.jpg",
            info: "Interior hallway, strong vanishing point"
          },
          {
            title: "Bridge crossing river, aerial view",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/bridge_crossing_river_aerial.jpg",
            info: "Bridge crossing river, aerial view"
          },
          {
            title: "Mountain valley, fog layers",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/mountain_valley_fog_layers.jpg",
            info: "Mountain valley, fog layers"
          },
          {
            title: "Urban intersection at night",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/urban_intersection_night.jpg",
            info: "Urban intersection at night"
          },
          {
            title: "Alleyway with strong shadows",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/alleyway_strong_shadows.jpg",
            info: "Alleyway with strong shadows"
          },
          {
            title: "Looking up at tall buildings",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/looking_up_tall_buildings.jpg",
            info: "Looking up at tall buildings"
          },
          {
            title: "Low-key lighting, dramatic mood",
            file_path: "data/image_gallery/watercolor/Architectural and Environmental Scenes/low_key_dramatic_mood.jpg",
            info: "Low-key lighting, dramatic mood"
          }
        ]
      },
      {
        group_name: "Objects and Still Life",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Hanging lanterns at night",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/hanging_lanterns_night.jpg",
            info: "Hanging lanterns at night"
          },
          {
            title: "Japanese torii gate",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/japanese_torii_gate.jpg",
            info: "Japanese torii gate"
          },
          {
            title: "Ancient temple ruins",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/ancient_temple_ruins.jpg",
            info: "Ancient temple ruins"
          },
          {
            title: "Coffee cup on table",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/coffee_cup_on_table.jpg",
            info: "Coffee cup on table"
          },
          {
            title: "Fruit bowl still life",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/fruit_bowl_still_life.jpg",
            info: "Fruit bowl still life"
          },
          {
            title: "Clock tower in sunset light",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/clock_tower_sunset.jpg",
            info: "Clock tower in sunset light"
          },
          {
            title: "Flower vase on window sill",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/flower_vase_window_sill.jpg",
            info: "Flower vase on window sill"
          },
          {
            title: "Vintage camera on desk",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/vintage_camera_on_desk.jpg",
            info: "Vintage camera on desk"
          },
          {
            title: "Tea set with steam rising",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/tea_set_with_steam.jpg",
            info: "Tea set with steam rising"
          },
          {
            title: "Apple and glass cup still life",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/apple_and_glass_still_life.jpg",
            info: "Apple and glass cup still life"
          },
          {
            title: "Ceramic vase with shadows",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/ceramic_vase_shadows.jpg",
            info: "Ceramic vase with shadows"
          },
          {
            title: "Forest clearing, morning fog",
            file_path: "data/image_gallery/watercolor/Objects and Still Life/forest_clearing_morning_fog.jpg",
            info: "Forest clearing, morning fog"
          }
        ]
      },
      {
        group_name: "Animals",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Squirrel eating nut",
            file_path: "data/image_gallery/watercolor/Animals/squirrel_eating_nut.jpg",
            info: "Squirrel eating nut"
          },
          {
            title: "Elephant side profile, savanna",
            file_path: "data/image_gallery/watercolor/Animals/elephant_side_profile_savanna.jpg",
            info: "Elephant side profile, savanna"
          },
          {
            title: "Dog looking up, portrait view",
            file_path: "data/image_gallery/watercolor/Animals/dog_portrait_looking_up.jpg",
            info: "Dog looking up, portrait view"
          },
          {
            title: "Cat stretching",
            file_path: "data/image_gallery/watercolor/Animals/cat_stretching.jpg",
            info: "Cat stretching"
          },
          {
            title: "Cat sleeping in sunlight",
            file_path: "data/image_gallery/watercolor/Animals/cat_sleeping_sunlight.jpg",
            info: "Cat sleeping in sunlight"
          },
          {
            title: "Dog running across grass",
            file_path: "data/image_gallery/watercolor/Animals/dog_running_across_grass.jpg",
            info: "Dog running across grass"
          },
          {
            title: "Lion resting under tree",
            file_path: "data/image_gallery/watercolor/Animals/lion_resting_under_tree.jpg",
            info: "Lion resting under tree"
          }
        ]
      }
    ]
  },
  {
    group_name: "Reference Photos",
    group_thumbnail_index: 0,
    subgroups: [
      {
        group_name: "Still Lifes",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Single Apple",
            file_path: "data/image_gallery/photos/still_lifes/single_apple.jpg",
            info: "Simple apple study for color and form"
          },
          {
            title: "Two Apples",
            file_path: "data/image_gallery/photos/still_lifes/two_apples.jpg",
            info: "Composition with two apples"
          },
          {
            title: "Onion & Ginger",
            file_path: "data/image_gallery/photos/still_lifes/onion_ginger.jpg",
            info: "Vegetables with different textures"
          },
          {
            title: "Mixed Vegetables",
            file_path: "data/image_gallery/photos/still_lifes/apples_ginger_onion.jpg",
            info: "Complex still life with multiple objects"
          },
          {
            title: "Statue Frontal",
            file_path: "data/image_gallery/photos/still_lifes/statue_frontal.jpg",
            info: "Classical statue study from front view"
          },
          {
            title: "Statue Side View",
            file_path: "data/image_gallery/photos/still_lifes/statue_side.jpg",
            info: "Classical statue from side angle"
          },
          {
            title: "Statue Rear View",
            file_path: "data/image_gallery/photos/still_lifes/statue_rear.jpg",
            info: "Classical statue from behind"
          }
        ]
      },
      {
        group_name: "Portraits",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Newborn Sleeping",
            file_path: "data/image_gallery/photos/portraits/newborn-sleeping.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=17322&picture=newborn-sleeping",
            info: "Peaceful sleeping infant portrait"
          },
          {
            title: "Sad Woman",
            file_path: "data/image_gallery/photos/portraits/sad-woman.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=19963&picture=sad-woman",
            info: "Emotional portrait study"
          },
          {
            title: "Sad Child Portrait",
            file_path: "data/image_gallery/photos/portraits/sad-child-portrait.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=19826&picture=sad-child-portrait",
            info: "Child portrait with emotional depth"
          },
          {
            title: "Smiling Woman with Hat",
            file_path: "data/image_gallery/photos/portraits/smiling-woman-with-hat.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=14815&picture=smiling-woman-with-hat",
            info: "Joyful portrait with accessory"
          },
          {
            title: "Angry Woman",
            file_path: "data/image_gallery/photos/portraits/angry-woman.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=15404&picture=angry-woman",
            info: "Portrait showing strong emotion"
          },
          {
            title: "Portrait of Man",
            file_path: "data/image_gallery/photos/portraits/portrait-of-man.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=310530&picture=portrait-of-man",
            info: "Classic male portrait"
          }
        ]
      },
      {
        group_name: "Postures",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Figure Study 1",
            file_path: "data/image_gallery/photos/postures/girl-swimsuit-body-figure-legs.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=421457&picture=girl-swimsuit-body-figure-legs",
            info: "Figure drawing reference"
          },
          {
            title: "Figure Study 2",
            file_path: "data/image_gallery/photos/postures/girl-swimsuit-body-figure-legs-1637863303xz4.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=421458&picture=girl-swimsuit-body-figure-legs",
            info: "Alternative figure pose"
          },
          {
            title: "Figure Study 3",
            file_path: "data/image_gallery/photos/postures/girl-swimsuit-body-figure-legs-16378632929cI.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=421456&picture=girl-swimsuit-body-figure-legs",
            info: "Third figure pose variation"
          },
          {
            title: "Mannequin Doll 1",
            file_path: "data/image_gallery/photos/postures/mannequin-doll-1467386881U0I.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=178398&picture=mannequin-doll",
            info: "Wooden mannequin for proportions"
          },
          {
            title: "Mannequin Doll 2",
            file_path: "data/image_gallery/photos/postures/mannequin-doll-1467386917cPt.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=178405&picture=mannequin-doll",
            info: "Mannequin in different pose"
          },
          {
            title: "Mannequin Doll 3",
            file_path: "data/image_gallery/photos/postures/mannequin-doll-1467387068RZ6.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=178396&picture=mannequin-doll",
            info: "Third mannequin pose"
          }
        ]
      },
      {
        group_name: "Animals",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Old Chimpanzee",
            file_path: "data/image_gallery/photos/animals/old-chimpanzee-11298298953dvv.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=11999&picture=old-chimpanzee",
            info: "Primate character study"
          },
          {
            title: "Leopard Head",
            file_path: "data/image_gallery/photos/animals/leopard-head.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=17011&picture=leopards-head",
            info: "Big cat facial features"
          },
          {
            title: "Lynx or Bobcat",
            file_path: "data/image_gallery/photos/animals/lynx-or-bobcat.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=33778&picture=lynx-or-bobcat",
            info: "Wild cat portrait"
          },
          {
            title: "Dog",
            file_path: "data/image_gallery/photos/animals/dog-13601642203yU.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=31959&picture=dog",
            info: "Domestic dog study"
          },
          {
            title: "Bighorn Sheep",
            file_path: "data/image_gallery/photos/animals/bighorn-sheep-1494079926qZJ.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=212551&picture=bighorn-sheep",
            info: "Mountain sheep with curved horns"
          },
          {
            title: "Cat on White",
            file_path: "data/image_gallery/photos/animals/cat-on-the-white-1462965930mn5.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=167326&picture=cat-on-the-white",
            info: "Domestic cat on neutral background"
          }
        ]
      },
      {
        group_name: "Landscapes",
        group_thumbnail_index: 0,
        images: [
          {
            title: "Blue Mountain Range 1",
            file_path: "data/image_gallery/photos/landscapes/blue-mountain-range-1478283688Iqy.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=197746&picture=blue-mountain-range",
            info: "Atmospheric mountain landscape"
          },
          {
            title: "Blue Mountain Range 2",
            file_path: "data/image_gallery/photos/landscapes/blue-mountain-range-1478283696L7W.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=197745&picture=blue-mountain-range",
            info: "Second mountain view"
          },
          {
            title: "Sun Setting",
            file_path: "data/image_gallery/photos/landscapes/sun-setting-1504885705iZt.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=226821&picture=sun-setting",
            info: "Sunset landscape scene"
          },
          {
            title: "Mountain Sunset",
            file_path: "data/image_gallery/photos/landscapes/mountain-sunset-1499698100ros.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=222123&picture=mountain-sunset",
            info: "Mountains at sunset"
          },
          {
            title: "Evening Landscape",
            file_path: "data/image_gallery/photos/landscapes/evening-landscape-13530956185Aw.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=27877&picture=evening-landscape",
            info: "Peaceful evening scene"
          },
          {
            title: "Autumn Landscape",
            file_path: "data/image_gallery/photos/landscapes/autumn-landscape-1379696322ccb.jpg",
            url: "https://www.publicdomainpictures.net/en/view-image.php?image=55215&picture=autumn-landscape",
            info: "Fall foliage landscape"
          }
        ]
      }
    ]
  },
  {
    group_name: "Old Masters",
    group_thumbnail_index: 0,
    images: [
      {
        title: "Girl with Pearl Earring",
        file_path: "data/image_gallery/old_masters/Johannes_Vermeer_(1632-1675)_-_The_Girl_With_The_Pearl_Earring_(1665).jpg",
        url: "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_(1632-1675)_-_The_Girl_With_The_Pearl_Earring_(1665).jpg",
        info: "Vermeer's masterpiece"
      },
      {
        title: "The Milkmaid",
        file_path: "data/image_gallery/old_masters/Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
        url: "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
        info: "Vermeer's domestic scene"
      },
      {
        title: "The Toilet of Venus",
        file_path: "data/image_gallery/old_masters/Peter_Paul_Rubens_-_The_toilet_of_Venus.jpg",
        url: "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_toilet_of_Venus.jpg",
        info: "Rubens' mythological painting"
      },
      {
        title: "Rape of the Daughters of Leucippus",
        file_path: "data/image_gallery/old_masters/Peter_Paul_Rubens_-_The_Rape_of_the_Daughters_of_Leucippus.jpg",
        url: "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Rape_of_the_Daughters_of_Leucippus.jpg",
        info: "Rubens' dynamic composition"
      },
      {
        title: "Rembrandt Self-Portrait",
        file_path: "data/image_gallery/old_masters/Rembrandt_à_la_casquette.jpg",
        url: "https://commons.wikimedia.org/wiki/File:Rembrandt_%C3%A0_la_casquette.tif",
        info: "Rembrandt with cap"
      },
      {
        title: "The Holy Family",
        file_path: "data/image_gallery/old_masters/The_Holy_Family_-_Rembrandt.jpg",
        url: "https://commons.wikimedia.org/wiki/File:The_Holy_Family_-_Rembrandt.jpg",
        info: "Rembrandt's religious scene"
      }
    ]
  }
];

// Gallery navigation state
export let currentView = 'groups'; // 'groups', 'subgroups', or 'images'
export let currentGroup = null;

export function setCurrentView(view) {
  currentView = view;
}

export function setCurrentGroup(group) {
  currentGroup = group;
}

export function getCurrentView() {
  return currentView;
}

export function getCurrentGroup() {
  return currentGroup;
}
