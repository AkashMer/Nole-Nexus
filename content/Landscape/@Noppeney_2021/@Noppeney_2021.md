---
authors:
  - Uta Noppeney
Title: Perceptual Inference, Learning, and Attention in a Multisensory World
Year: 2021
citekey: Noppeney_2021
itemType: journalArticle
Journal: Annual Review of Neuroscience
Volume: 44
Issue: Volume 44, 2021
Publisher: Annual Reviews
Pages: 449-473
DOI: 10.1146/annurev-neuro-100120-085519
created: 2026-07-20
modified: 2026-07-20
---
Several of my previous readings were limited to the perception of space, but none of them viewed the other facet of spatial perception: multisensory integration. I believe integration is the ultimate step in spatial perception, requiring the brain to make sense of noisy input from the body's sensory apparatus. A search in this direction brought me to this review paper which compares observers' multisensory processing against a Bayesian framework which assumes each sense contributes independent noise to a common underlying signal, i.e. normative inference.  

## Integration Across Modalities: How Does the Brain Reduce Perceptual Uncertainty?

| Models                     | Supportive Findings                                                                                                                                                                                                               | Discovered Limitations                                                                                                                                                                                                                                       |
| -------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Forced fusion model**    | Near-optimal responses for,<br>- visuohaptic shape, audiovisual rate, audiovisual spatial discrimination, object/phoneme categorization;<br>- spatial ventriloquism, McGurk illusions;<br>- cue combination within a single sense | - visual signal overweighting with optimal audiovisual variance reduction;<br>- overweighting task-informative modality;<br>- more prominent in naïve observers, where model assumptions about priors, cost functions, structure of sensory noise are unmet; |
| **Drift-diffusion models** | Optimal responses for heading discrimination                                                                                                                                                                                      |                                                                                                                                                                                                                                                              |

## Solving the Binding Problem: Common vs. Independent Sources

Integration across senses breaks down when there is conflicting information collected from either sense or when the signal itself is temporally uncorrelated.  

| Mechanism                     | Supportive Findings                                                                                                                                                                                                                                                                                                                                                                                      | Discovered Limitations                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Bayesian causal inference** | - Signals from common sources integrated by forced fusion;<br>- Signals from independent sources segregated;<br>- final estimate = posterior-weighted model average;<br>- Temporal sequence across cortical hierarchy: *50–100 ms* segregation in primary sensory areas, *100–200 ms* fusion in posterior parietal areas, *350–450 ms* integrate/segregate based on disparity in anterior parietal areas | - Arbitration occurs at fixed conflict size, ignoring sensory uncertainty;<br>- Deviations from forced fusion even on congruent/small-conflict trials could be due to remaining causal uncertainty from randomly interspersed trials;<br>- Findings confounded by instructional attention to one modality;<br>- Prestimulus alpha power shifts binding tendency independent of actual disparity |

## Multisensory Integration and Attention

| Mechanisms                          | Description                                                                                                                                                                                                                                                                                          | Discovered Limitations                                                                                                     |
| ----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **Normative statistical inference** | - Posterior distributions depend on existing priors and cost functions;<br>- Cost functions change how the posterior distributions are used but do not change them;<br>- Recurrent sampling using the same cost functions changes the distribution due to new samples;<br>- Scales with cue validity | - Task instructions are followed even with 50% validity thus optimizing voluntarily even when it does not help performance |
| **Selective attention**             | Approximate posterior distribution constructed from recurrent shifting of attention spotlight to account for biological constraints in real-world scenarios.                                                                                                                                         |                                                                                                                            |
| **Bottom-up attention**             | Spatiotemporal maps constructed from integration may go beyond linear combination of audiovisual maps by drawing attention, especially in real-world scenarios.                                                                                                                                      |                                                                                                                            |

## Adapting to a Dynamic World

Possible mechanisms include,  

- *Temporal integration* (up to 4 sec in the past) of reliabilities to build hyperpriors.
- *Cross-sensory prior adaptation* based on prior experience and how well the two cues are related to each other. For example, visuospatial, novel echolocation cues were short of normative prediction, but visual and vestibular cues for yaw and roll axes were normative.
- *Joint adaptation of priors* with expectations managed by auditory and parietal cortices and attentional influence exerted by frontoparietal cortices.
- *Cross-sensory recalibration* in both forms,
	- unsupervised - to maintain consistency between senses
	- supervised - to maintain accuracy with respect to the real-world
	Recalibration occurs at several timescales ranging from msec to days with overlap of both short-term and long-term recalibration in opposite directions. This has only been observed in unisensory adaptation and sensorimotor learning so far.

## Multisensory Processing as a Whole
![[multisensory_perception_facets_dark.svg]]\
*On the surface, this paper is a literature review of the microcosm of multisensory processing. But at the core, it's about the brain solving the intractable problem of seamless percept by recruiting normative probabilistic mechanisms of binding, attention, adaptation and learning at a suboptimal level to improve integration as a whole under biological constraint.*  
I chose to represent the whole process as the famous blind men and elephant parable. This parable involves blind men unable to determine the creature they are touching is an elephant. This serves as a metaphor for the brain trying to form a percept of the world from which inferences could be drawn. So, I chose to extend this parable by introducing various mechanisms described in this review paper. Think of the blindfolded men in the visual as individual senses. Thus binding is represented as two men communicating with each other which in turn allows them to share and compare information about the real state of the world (elephant). Attention is shown as a large hand with strings attached to the two men on the right in order to focus and guide their actions towards a common goal. The incorporeal nature of the hand signifies the unsettled nature of the mechanisms of attention. The iteration required for adaptive and learning mechanisms is represented by a simple arrow.  
Thus, multisensory processing can be viewed as a process which has many layers extending from its internal core to downstream processes of attention, adaptation and learning. This process requires an optimal solution under the constraints (blindfold) of the body's physiology. Each layer performs suboptimally under these constraints, but the eventual whole is more cohesive in order to allow inference and decision making.  

This review paper has provided me with numerous candidates for the mechanism behind the construction of a sense of space. My next step would involve searching and reading which mechanisms have been tested specifically in the case of spatial perception of naturalistic environments. The interaction with other higher processes (attention, learning) is a thread that should be considered when studying multisensory processing of spatial perception.  

> [!synthesis]
> **Claim**: The brain solves the intractable inference problem of multisensory perception by recruiting distinct mechanisms such as normative Bayesian inference, model averaging, attention interactions, and multi-timescale recalibration. Under biological & dynamic world constraints, these mechanisms perform suboptimally but jointly approximate a normative solution.
> 
> **Contribution**: The paper presents the multisensory integration process from core mechanisms to downstream interactions using behavioral, computational, and neural evidence.

> [!citation]
> Noppeney, U. (2021). Perceptual Inference, Learning, and Attention in a Multisensory World. _Annual Review of Neuroscience_, _44_(Volume 44, 2021), 449–473. [https://doi.org/10.1146/annurev-neuro-100120-085519](https://doi.org/10.1146/annurev-neuro-100120-085519)
