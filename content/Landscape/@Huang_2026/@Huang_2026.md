---
authors:
  - Yan Huang
  - Anran Liu
  - Xiao Xu
  - Kechen Du
  - Dun Mao
Title: Untangling View and Place Coding along the Macaque PPC-RSC-HPC Pathway
Year: 2026
citekey: Huang_2026
itemType: journalArticle
Journal: Proceedings of the National Academy of Sciences
Volume: 123
Issue: 23
Publisher: Proceedings of the National Academy of Sciences
Pages: e2530923123
DOI: 10.1073/pnas.2530923123
sourceTitle: Simultaneous transformations of view and place coding across reference frames in the macaque brain
created: 2026-08-22
modified: 2026-08-22
---

<a href="Landscape/@Vericel_2024/@Vericel_2024" class="wikilink">View meets Place in the Primate Brain</a> left me with some open questions such as how do PPC and HPC communicate and whether the virtual position codes in the VR setup were confounded by the visual nature of the task. The following paper set out to untangle this confound in macaque monkeys by using a foraging task in a naturalistic environment.

## Behavioral Setup

The three monkeys were allowed to freely roam in a naturalistic arena (two: visually rich, cuboid; one: visually impoverished, cylindrical) while foraging for randomly dropped food pellets. Single-neuron activity and local field potentials (LFPs) were wirelessly recorded using implanted wire microdrives across posterior parietal cortex (PPC), retrosplenial cortex (RSC) and hippocampus (HPC). Thus, not all neurons were recorded in one session. Behavioral variables computed from head motion and eye-movement tracking data include:

- **Egocentric**:
  - *Egocentric Arena Center (EC)* - distance and bearing to the arena center
  - *Translational Speed (TS)*
  - *Angular Velocity (AV)*
  - *Head Tilt (HT)*
  - *Eye-in-Head position (EH)* - horizontal and vertical degrees of pupil in head-centered reference frame (equivalent to a known transformation that occurs in PPC)
- **Allocentric**:
  - *Gaze Direction (GD)*
  - *Spatial View field (SV)*
  - *Head Direction (HD)*
  - *Facing Location (FL)* - SV-equivalent variable for HD data
  - *Position (Pos)*

## Characteristics of Neurons along the PPC-RSC-HPC Pathway

The following results were shown:

<img src="huang-2026-results-dark.svg" class="wikilink" alt="tall-mindmap" />\
I chose to represent the major findings as purple nodes or connections between the three areas. The blue brackets and nodes signify the accumulation of evidence which prompted particular inferences by the authors. The orange nodes/connections represent the open questions that I feel require further investigation.

## View and Place Coding transforms distinctly along the pathway

<img src="ppc-rsc-hpc-gradients-dark.svg" class="wikilink" alt="ppc-rsc-hpc-gradients-dark.svg" />\
*On the surface, this is about the characteristics of neurons along the PPC $\to$ RSC $\to$ HPC pathway. But at the core, it’s really about how the opposing gradients of egocentric and allocentric representations show recurring gain-modulations distinctly for view and place, with RSC acting as the hub.*\
The key conclusion can be represented by the above comic of a man entering a room through a door. At the PPC level, the egocentric bias is high as if viewing the above instance from a first-person perspective. The purple-colored cylindrical object placed at the center of the room serves as a landmark. I chose to represent gain-modulation as a knob that is turned by one information type to control the firing rate of a neuron across another information type. The resulting effect can occur in two ways:

- Zooming away and upwards $\implies$ a bird’s eye view, which forms the basis of the place code
- Zooming towards a particular “patch” $\implies$ “spatial view” of the environment

The landmark’s perceptual information is modulated by gaze and heading directions to obtain the allocentric bearing, which can be used to construct positional information.\
The allocentric spatial view representation can be built similarly from the allocentric bearing and this positional information. The study was able to establish a modulatory role of gaze direction and position for spatial view as represented by the recurring knob in the visual, but left an open question about how the spatial view can be built from this connection.\
The view of the same instance from different zoom levels across the three areas (like a video game) was deliberate to show the opposing gradients of spatial coding. The role of RSC as a hub is further supported by the oscillatory connections with distinct frequencies signifying simultaneous but temporally segregated routing of information.

I am left with the following open questions beyond the future directions suggested by the authors:

1.  Do similar characteristics of SV neurons emerge when only considering neurons sensitive to areas where the food pellets can be dropped, i.e., the floor of the arena?
2.  Does the above narrow population simultaneously code for the same position?
3.  Will the above two questions lead to the reason behind HPC having shift neurons?
4.  Is there another mechanism responsible for early egocentric to allocentric reference frame transformation along the circuit connections between PPC and RSC? This was prompted by RSC pseudo-population showing similar decoding accuracy for allocentric variables as HPC, suggesting the allocentric information was transformed and decodable already. Simultaneously, PPC pseudo-population showed decoding accuracy for allocentric variables above chance.

> [!synthesis]
> **Claim**: The primate PPC-RSC-HPC pathway shows opposing gradients of egocentric and allocentric representations with recurring gain-modulations distinctly for view and place. RSC acts as the hub while some HPC position fields shift on reorientation.
>
> **Contribution**: Multi-region recordings from macaques in naturalistic environments can reduce the confound between view and place codes. The study also extends gain-modulation as a general mechanism for coordinate transformations in primates.

> [!citation]
> Huang, Y., Liu, A., Xu, X., Du, K., & Mao, D. (2026). Simultaneous transformations of view and place coding across reference frames in the macaque brain. *Proceedings of the National Academy of Sciences*, *123*(23), e2530923123. <https://doi.org/10.1073/pnas.2530923123>
