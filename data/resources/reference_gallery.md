Refactor the Reference image gallery. It should now have also nested groups

Top level Groups

Simple Shapes Renderings (the current group Simple Shapes, contains those Images)
Pencil Sketches (The sub groups of this groups are contained in the directory 'pencil' which contains the images)
Watercolor Paintings (The sub groups of this group are contained in the directory 'watercolor' which contains the images)
Reference Photos (Contains the current groups Still Lifes, Portraits, Postures, Animals, Landscapes)
Old Masters (the same old group)

Restructure the old groups into this new structure with sub groups The new top level groups pencil and watercolor are structured like:


    motives = {
  "Human Figures": [
    ["female_figure_sitting_chair_sideview.jpg", "Female figure sitting on a chair, side view, natural pose"],
    ["male_figure_walking_streetwear.jpg", "Male figure walking mid-step, streetwear clothing"],
    ["dancer_in_motion_flowing_dress.jpg", "Dancer in motion, flowing dress, soft lighting"],
    ["person_holding_umbrella_rain.jpg", "Person holding umbrella, rainy day"],
  ],

  "Portraits": [
    ["male_portrait_dramatic_lighting.jpg", "Male portrait, dramatic side lighting"],
    ["old_man_wrinkled_portrait.jpg", "Old man with wrinkles, character portrait"],
    ["figure_in_candlelight_chiaroscuro.jpg", "Figure in candlelight, chiaroscuro"],
    ["portrait_lit_from_below.jpg", "Portrait lit from below"],
    ["person_under_streetlamp_night.jpg", "Person under streetlamp at night"]
  ],

  "Facial Expressions": [
    ["smile_with_teeth.jpg", "Smile with teeth, natural lighting"],
    ["sad_face_teary_eyes.jpg", "Sad face, teary eyes"],
    ["shocked_expression_open_mouth.jpg", "Shocked expression, mouth open"],
    ["confused_face_head_tilted.jpg", "Confused face, head tilted"],
    ["crying_face_soft_lighting.jpg", "Crying face, soft lighting"],
    ["mischievous_smile.jpg", "Mischievous smile"]
  ],

  "Hands and Gestures": [
    ["two_hands_interacting.jpg", "Two hands interacting with each other"],
    ["hand_gripping_cup.jpg", "Hand gripping a cup"],
    ["child_hand_holding_adult_finger.jpg", "Child’s hand holding an adult’s finger"],
    ["hand_holding_flower.jpg", "Hand holding a small flower"]
  ],

  "Architectural and Environmental Scenes": [
    ["street_alley_one_point_perspective.jpg", "Street alley, one-point perspective"],
    ["interior_hallway_vanishing_point.jpg", "Interior hallway, strong vanishing point"],
    ["bridge_crossing_river_aerial.jpg", "Bridge crossing river, aerial view"],
    ["mountain_valley_fog_layers.jpg", "Mountain valley, fog layers"],
    ["urban_intersection_night.jpg", "Urban intersection at night"],
    ["alleyway_strong_shadows.jpg", "Alleyway with strong shadows"],
    ["looking_up_tall_buildings.jpg", "Looking up at tall buildings"],
    ["low_key_dramatic_mood.jpg", "Low-key lighting, dramatic mood"]
  ],

  "Objects and Still Life": [
    ["hanging_lanterns_night.jpg", "Hanging lanterns at night"],
    ["japanese_torii_gate.jpg", "Japanese torii gate"],
    ["ancient_temple_ruins.jpg", "Ancient temple ruins"],
    ["coffee_cup_on_table.jpg", "Coffee cup on table"],
    ["fruit_bowl_still_life.jpg", "Fruit bowl still life"],
    ["clock_tower_sunset.jpg", "Clock tower in sunset light"],
    ["flower_vase_window_sill.jpg", "Flower vase on window sill"],
    ["vintage_camera_on_desk.jpg", "Vintage camera on desk"],
    ["tea_set_with_steam.jpg", "Tea set with steam rising"],
    ["apple_and_glass_still_life.jpg", "Apple and glass cup still life"],
    ["ceramic_vase_shadows.jpg", "Ceramic vase with shadows"],
    ["forest_clearing_morning_fog.jpg", "Forest clearing, morning fog"]
  ],

  "Animals": [
    ["squirrel_eating_nut.jpg", "Squirrel eating nut"],
    ["elephant_side_profile_savanna.jpg", "Elephant side profile, savanna"],
    ["dog_portrait_looking_up.jpg", "Dog looking up, portrait view"],
    ["cat_stretching.jpg", "Cat stretching"],
    ["cat_sleeping_sunlight.jpg", "Cat sleeping in sunlight"],
    ["dog_running_across_grass.jpg", "Dog running across grass"],
    ["lion_resting_under_tree.jpg", "Lion resting under tree"]
  ]
    }


