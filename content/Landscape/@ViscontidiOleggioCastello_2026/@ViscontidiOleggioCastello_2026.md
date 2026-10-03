---
authors:
  - Matteo Visconti di Oleggio Castello
  - Fatma Deniz
  - Tom Dupré la Tour
  - Jack L Gallant
Title: Voxel-wise Encoding Models
Year: 2026
citekey: ViscontidiOleggioCastello_2026
itemType: preprint
sourceTitle: "Encoding models in functional magnetic resonance imaging: the Voxelwise Encoding Model framework"
created: 2026-10-03
modified: 2026-10-03
---

During a recent interview for a lab position, the discussion about <a href="workbench/scene-areas-hierarchy-rsa/scene-areas-hierarchy-rsa" class="wikilink">Multiple Regression RSA of Scene-Selective Areas in Human fMRI</a> approached the following question:

> *“Why did you not try to regress voxel activations directly?”*

My answer was simple in the moment since my main aim was to practice applying RSA. Later, I encountered a huge problem while trying to regress voxel activations:

- The number of voxel $\beta$-activations computed from General Linear Model (GLM) were outnumbering the number of available data points
- Using raw voxel activations could solve the above problem, but now the predictor variables were increasing in order to compensate for the hemodynamic delay and motion artifacts.

The above tension prompted a search for a framework that would teach me how to regress voxel activations.

## Basic Idea of VEM

Any experiment involving fMRI data (or any neural data obtained non-invasively such as EEG) is usually a non-linear reflection of the actual neural activity. This neural activity is also non-linearly related to the task. VEM framework involves *linearizing* the stimulus/task into a matrix of features called “feature spaces”. These feature spaces usually represent a hypothesis grounded in behavioral theories. For example, a task involving object recognition can be represented by a feature space which records various properties of the object such as color, shape, orientation, and so on. Thus a feature space can be categorically simple, or it can expand to many dimensions where it can outnumber the amount of recorded samples. Such complex feature spaces usually contain correlated features as well, such as shape and orientation in the above example.

VEM framework solves the above problem by using **Regularized Linear Regression**, where the recorded neural activity is regressed against the above linearized feature spaces. The regression stays linear, but is able to capture non-linear relationships between the recorded activity and the stimuli. Regularization changes the optimization problem of the regression such that the weights computed are constrained by an extra parameter ($\lambda \geq 0$). Ridge regression is suggested under the VEM framework, which scales the weights in a linear model proportionally to how large they are. This solves the following problems,

- The collinearity of features by stabilizing the matrix (scales down huge numbers aggressively)
- Prevents overfitting despite of having more features than samples

## The Voxel-wise Encoding Model Framework

<img src="vem-framework-dark.svg" class="wikilink" width="371" />\
<a href="#Appendix" class="wikilink">(see full map in Appendix)</a>
*On the surface, VEM is about modelling the neural activity captured during fMRI. But at the core, VEM framework is highly versatile due to the use of regularization and following a structured path grounded in good data science practices alchemizes the versatility to interpretability.*\
I chose to use the word alchemize because it involves structured frameworks for transforming raw materials into something that can used. Similarly, VEM framework transforms the raw feature spaces and the recorded neural data into a model which can be used to interpret neural data as long as the pitfalls are known. The alchemist in the above visual plays the role of the VEM framework.

My aim going forward is to implement the VEM framework to the same RSA analysis that started this journey.

> [!synthesis]
> **Claim**: VEM framework is highly versatile due to the use of regularization and following a structured path grounded in good data science practices alchemizes the versatility to interpretability.
>
> **Contribution**: The authors consolidated two decades of lab practice into a step-by-step guide which states all the pitfalls.

> [!citation]
> Visconti di Oleggio Castello, M., Deniz, F., Dupré la Tour, T., & Gallant, J. L. (2026). *Encoding models in functional magnetic resonance imaging: The Voxelwise Encoding Model framework* (Nt2jq_v3). PsyArXiv. <https://osf.io/preprints/psyarxiv/nt2jq_v3/>

## Appendix

<img src="vem-framework-mindmap-dark.svg" class="wikilink" alt="mindmap" />
