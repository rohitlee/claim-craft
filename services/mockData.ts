import { PracticeQuestion } from '../types';

export const practiceQuestions: PracticeQuestion[] = [
  {
    id: 'q1',
    title: 'Smart Coffee Mug',
    description: `An inventor has created a new coffee mug that maintains the coffee at a user-selected temperature. The mug has a heating element integrated into its base, a temperature sensor, and a small rechargeable battery. The user sets the desired temperature using a dial on the bottom of the mug. The key innovation is a novel insulating material used in the mug's wall that reduces heat loss by 50% compared to a standard ceramic mug, allowing the battery to last for over 3 hours.`,
    originalClaim: `A coffee mug for maintaining a beverage at a set temperature, the mug comprising: a vessel having a wall and a base; a heating element located in the base of the vessel; a temperature sensor configured to measure the temperature of the beverage within the vessel; a power source electrically coupled to the heating element; a user-adjustable control to set the desired temperature; and a thermal insulating layer integrated within the wall of the vessel, wherein the thermal insulating layer is configured to reduce heat loss.`,
    novelty: `The primary novelty is the specific combination of an active heating system with a highly efficient thermal insulating layer integrated directly into the mug's structure.`,
    inventiveStep: `While heated mugs and insulated mugs exist, the combination which results in a significantly extended battery life (3+ hours) for a portable, actively heated mug is non-obvious. The inventive step lies in achieving this efficiency through the synergistic effect of the specific insulating layer and the heating system.`,
  },
  {
    id: 'q2',
    title: 'Automated Pet Feeder with Weight Sensor',
    description: `A new automated pet feeder has been developed. It includes a food reservoir, a dispensing mechanism, and a timer to release food at programmed times. The unique feature is a weight sensor integrated into the food bowl. This sensor measures the amount of food remaining in the bowl. If the pet hasn't eaten the food after a set period (e.g., 1 hour), the feeder sends a notification to the owner's smartphone via a connected app. This helps owners monitor their pet's appetite and health.`,
    originalClaim: `An automated pet feeder, comprising: a food reservoir for storing pet food; a dispensing mechanism configured to transfer food from the reservoir to a bowl; a programmable timer operatively connected to the dispensing mechanism; a weight sensor associated with the bowl, configured to generate data corresponding to the weight of food in the bowl; and a communication module configured to transmit a notification to a remote device based on the data from the weight sensor indicating that food remains in the bowl after a predetermined time interval has elapsed since dispensing.`,
    novelty: 'The novelty is the inclusion of a weight sensor in the bowl to detect uneaten food and the subsequent triggering of a notification to a remote device.',
    inventiveStep: 'The inventive step is the proactive monitoring of a pet\'s eating habits. Standard feeders just dispense food. This invention links the physical act of feeding with data collection (weight sensor) and remote communication, providing a health monitoring function that is not an obvious extension of simple automated feeding.',
  },
];
