
  /*create timeline*/
  var timeline = []

  /* welcome message*/

  var welcome = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
  };
  timeline.push(welcome);

  var instruct = {
    type: "html-keyboard-response",
    stimulus: "<p>In this experiment, you will be briefly shown pairs of images of cats,</p>" +
    "<p>presented one after another.</p>"+
    "<p>Your task is to judge whether the pairs of images show the <strong>same</strong> or <strong>different</strong> cats.</p>"+
    "<p> Press any key to continue.</p>"
  };
  timeline.push(instruct);

  var instruct2 = {
    type: "html-keyboard-response",
    stimulus: "<p> If you think the two images were of the <strong>same</strong> cat, press 'L'</p>"+
    "<p> If you think the two images showed <strong>different</strong> cats, press 'A'</p>"+
    "<p> Press any key to continue.</p>"
  };
  timeline.push(instruct2);

  var practiceInstruct = {
    type: "html-keyboard-response",
    stimulus: "<p> Let's start with a practice trial.</p>"+
    "<p>Press any key to continue.</p>"
  };
  timeline.push(practiceInstruct);

  /*practice trial*/

  var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
    data: {test_part: 'fixation'}
  };

  var practrial = {
    type: "same-different-image",
    stimuli: ['img2/Milk.jpg', 'img2/Notmilk.jpg'],
    same_key: 'L',
    different_key: 'A',
    answer: 'different',
    first_stim_duration: 500,
    second_stim_duration: 500,
    gap_duration: 250,
    on_finish: function(data){
      if(data.key_press == 65){data.correct=true} else {data.correct=false};
    }
  };

  var feedback = {
    type: "html-keyboard-response",
    stimulus: function(){
      var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
      if(last_trial_correct){
        return "<p>Correct!</p>"
      } else {
        return"<p>Wrong.</p>"
      }
    }
  };

  var pracprocedure = {
    timeline: [fixation, practrial, feedback]
  };
  timeline.push(pracprocedure);

  var endprac = {
    type: "html-keyboard-response",
    stimulus: "<p>Great! Now get comfortable, and have your fingers resting on the</p>"+
      "<p>'A' and 'L' keys so you can respond as quickly as possible.</p>"+
      "<p>When you are ready press any key to begin the trials.</p>"
  };
  timeline.push(endprac);

  var stimuli = [
    {stimulus: ['Milk-Matching/milk_distractors/DistractorDifficult0A.jpg','Milk-Matching/milk_distractors/DistractorEasy0A.jpg'], data: {correct_response:'65'}},
{stimulus: ['Milk-Matching/milk_latent/Milk1.jpg','Milk-Matching/milk_distractors/DistractorDifficult1A.jpg'], data:{correct_response:'65'}},
{stimulus: ['Milk-Matching/milk_latent/Milk2.jpg','Milk-Matching/milk_distractors/DistractorDifficult2A.jpg'], data: {correct_response:'65'}},
{stimulus: ['Milk-Matching/milk_latent/Milk4.jpg','Milk-Matching/milk_distractors/DistractorDifficult4A.jpg'], data: {correct_response:'65'}},
{stimulus: ['Milk-Matching/milk_latent/Milk0.jpg','Milk-Matching/milk_target/Milk5.jpg'], data: {correct_response:'76'}},
{stimulus: ['Milk-Matching/milk_latent/Milk3.jpg','Milk-Matching/milk_target/Milk7.jpg'], data: {correct_response:'76'}},
{stimulus: ['Milk-Matching/milk_target/Milk8.jpg','Milk-Matching/milk_target/Milk9.jpg'], data: {correct_response:'76'}},
{stimulus: ['Milk-Matching/milk_target/Milk6.jpg','Milk-Matching/milk_latent/Milk1.jpg'], data: {correct_response:'76'}},
];

var fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 500,
  data: {test_part: 'fixation'}
};

var testtrial = {
  type: "same-different-image",
  stimuli: jsPsych.timelineVariable('stimulus'),
  same_key: 'l',
  different_key: 'a',
  first_stim_duration: 500,
  second_stim_duration: 500,
  gap_duration: 250,
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    if(data.key_press == data.correct_response){data.correct=true} else {data.correct=false};
  }
};

var testProcedure = {
  timeline: [fixation, testtrial],
  timeline_variables: stimuli,
  randomize_order: true,
};
timeline.push(testProcedure);
